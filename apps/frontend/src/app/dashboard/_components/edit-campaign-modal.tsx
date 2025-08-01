"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import FormFactory from "@/components/custom/form-factory";
import type { FieldConfig, FormValues } from "@/types";
import { campaignFormSchema } from "@/schema/donation";
import apiService from "@/lib/apiService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { fetchCategories } from "@/lib/api";

export const editCampaignErrorMessages = {
  GENERIC_ERROR: "There was an error updating your campaign.",
} as const;

export default function EditCampaignModal({ campaign }: any) {
  const [error, setError] = useState<string | null>(null);
  const { GENERIC_ERROR } = editCampaignErrorMessages;
  const [isOpen, setIsOpen] = useState(false); // Track dialog open state

  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const campaignFormFields: FieldConfig[] = [
    {
      name: "title",
      label: "Title",
      type: "text",
      placeholder: "Enter campaign title",
    },
    {
      name: "categoryId",
      label: "Category",
      type: "select",
      options: data?.map((category: any) => ({
        label: category?.name,
        value: category?.id,
      })),
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      placeholder: "Enter campaign description",
    },
    {
      name: "imageUrl",
      label: "Campaign Image",
      type: "files",
      fileUploadOptions: {
        maxFiles: 1,
        maxSize: 1024 * 1024,
        accept: { "image/*": [".jpg", ".jpeg", ".png"] },
      },
    },
    {
      name: "targetAmount",
      label: "Amount",
      type: "number",
      placeholder: "Enter amount to raise in naira",
    },
    {
      name: "deadline",
      label: "Campaign Deadline",
      type: "date",
      placeholder: "Enter due date to raise the amount",
    },
  ];

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: any) => {
      const { id, ...payload } = data;
      const response = await apiService.patch(`/campaign/${id}`, payload);

      return response.data;
    },
    onSuccess: (data) => {
      toast("Campaign updated succssfully");
      setIsOpen(false); // Close modal on success
    },
    onError: (err: any) => {
      toast.error(GENERIC_ERROR);
    },
  });

  async function handleCreateCampaign(data: FormValues | any): Promise<void> {
    console.log(data);
    setError(null);
    mutate({
      ...data,
      id: campaign.id,
      imageUrl: data.imageUrl[0].url,
      currency: "₦",
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setIsOpen(true)}
          size="sm"
          className="bg-green-600 hover:bg-green-700 flex-1"
        >
          <Plus className="mr-2 h-4 w-4" />
          Edit Campaign
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Campaign</DialogTitle>
        </DialogHeader>
        <FormFactory
          fields={campaignFormFields}
          schema={campaignFormSchema}
          formWrapperClassName="w-full flex flex-col"
          formFieldElClass="w-full"
          onSubmit={handleCreateCampaign}
          defaultValues={{
            // ...campaign,
            title: campaign.title,
            description: campaign.description,
            categoryId: campaign.categoryId,
            targetAmount: campaign.targetAmount,
            deadline: campaign.deadline,
            imageUrl: [
              {
                url: campaign.imageUrl,
                filename: campaign.imageUrl,
                mimeType: "jpg",
              },
            ],
          }}
          actionButtonsComponent={
            <div className="flex flex-col gap-4">
              <Button
                type="submit"
                disabled={isPending}
                className="bg-green-600 hover:bg-green-700"
              >
                {isPending ? "Saving..." : "Save"}
              </Button>

              {error ? (
                <Label className="text-destructive">{error}</Label>
              ) : null}
            </div>
          }
        />
      </DialogContent>
    </Dialog>
  );
}
