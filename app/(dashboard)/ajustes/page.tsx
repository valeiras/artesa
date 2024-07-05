import PageWrapper from "@/components/PageWrapper";
import { CreateMockDataButton, RemoveDataButton } from "@/components/settings";
import React, { PropsWithChildren } from "react";

const SettingsPage: React.FC = async () => {
  return (
    <PageWrapper heading="Ajustes">
      <div className="text-sm">
        <SettingsSection
          title="Datos de prueba: "
          description="si quieres probar el funcionamiento la aplicación, podemos crear algunos datos de prueba."
        >
          <CreateMockDataButton />
        </SettingsSection>
        <SettingsSection title="Eliminar datos: " description="elimina todos tus datos (los propios y los de prueba).">
          <RemoveDataButton />
        </SettingsSection>
      </div>
    </PageWrapper>
  );
};

const SettingsSection: React.FC<PropsWithChildren<{ title: string; description: string }>> = ({
  children,
  title,
  description,
}) => {
  return (
    <div className="flex flex-col gap-2 mb-8">
      <hr />
      <p className="mb-2">
        <span className="font-semibold">{title}</span>
        {description}
      </p>
      {children}
    </div>
  );
};

export default SettingsPage;
