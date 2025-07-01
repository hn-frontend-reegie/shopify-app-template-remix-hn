import { useEffect, useState } from "react";
import { LegacyCard, LegacyStack, Page, Text } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useOutletContext } from "@remix-run/react";
import PrivilegeIllustration from "../assets/images/privilege.svg";
import { privilegeConfig } from "../constants/privilege.config";

const PageUnavailable = () => {
  return (
    <Page>
      <TitleBar />
      <LegacyCard sectioned>
        <div style={{ padding: 30 }}>
          <LegacyStack vertical alignment="center">
            <img
              src={PrivilegeIllustration}
              width={300}
              alt="Application Privilege"
            />
            <Text variant="heading3xl" as="p">
              This page is not available.
            </Text>
            <Text as="span" tone="subdued">
              It appears that you may have insufficient privilege to access this
              page. Please contact administrator.
            </Text>
          </LegacyStack>
        </div>
      </LegacyCard>
    </Page>
  );
};

const withPrivilege = <P extends object>(
  restrictionName: string,
  WrappedComponent: React.ComponentType<P>,
) => {
  return (props: P) => {
    const privilegesData = useOutletContext();
    const [hasAccess, setHasAccess] = useState(false);

    useEffect(() => {
      const { privileges: accesses } = privilegesData;

      const accessName = privilegeConfig.restrictions.find(
        (restriction) => restriction.name === restrictionName,
      );

      const userPrivilegeAccess = accesses.find((access) =>
        access.privilege.includes(accessName.required[0].privilege),
      );

      if (!userPrivilegeAccess) return setHasAccess(false);

      setHasAccess("A" === userPrivilegeAccess.read);
    }, [privilegesData, restrictionName]);

    return hasAccess ? <WrappedComponent {...props} /> : <PageUnavailable />;
  };
};

export default withPrivilege;
