import PageWrapper from "@/components/PageWrapper";
import { CreateMockDataButton } from "@/components/settings";
import React, { PropsWithChildren } from "react";

const SettingsPage: React.FC = async () => {
  return (
    <PageWrapper heading="Ajustes">
      <SettingsSection>
        <p className="mb-2">
          <span className="font-semibold">Datos de prueba: </span>
          si quieres probar el funcionamiento la aplicación, podemos crear algunos datos de prueba.
        </p>
        <CreateMockDataButton />
      </SettingsSection>
    </PageWrapper>
  );
};

const SettingsSection: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex flex-col gap-2">
      <hr />
      {children}
    </div>
  );
};

export default SettingsPage;
