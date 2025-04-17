import { AdminLayout } from "@/components/admin-layout.tsx";
import { CreatePurchaseForm } from "@/components/forms/create-purchase-form.tsx";

const PurchaseCreate = () => {
  return (
    <AdminLayout pageName="Create purchase">
      <CreatePurchaseForm />
    </AdminLayout>
  );
};

export default PurchaseCreate;
