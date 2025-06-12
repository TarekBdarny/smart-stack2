import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

export const StoreApproval = ({ name }: { name: string }) => (
  <Html>
    <Head />
    <Body style={main}>
      <Preview>You&apos;re ready to manage and sell your inventory</Preview>

      <Container style={container}>
        <Section style={box}>
          <Text style={logo}>Smart Stock</Text>
          <Hr style={hr} />

          <Text style={subTitle}>
            {name}, Congratulations on creating your Smart Stock Store!
          </Text>

          <Text style={paragraph}>
            Thanks for choosing Smart Stock as your smart inventory management
            solution! We&apos;re excited to have you on board.
          </Text>
          <Text style={paragraph}>
            You can view you&apos;re newly created Store via visiting your
            Dashboard
          </Text>
          <Button style={button} href="http://localhost:3000/en/dashboard">
            View your Smart Stock Dashboard
          </Button>
          <Hr style={hr} />
          <Text style={paragraph}>-The Smart Stock Team</Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default StoreApproval;

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const box = {
  padding: "0 48px",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const paragraph = {
  color: "#525f7f",

  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left" as const,
};
const subTitle = {
  color: "#525f7f",
  fontSize: "18px",
  lineHeight: "24px",
  textAlign: "left" as const,
  fontWeight: "bold",
};
const logo = {
  color: "oklch(0.546 0.245 262.881)",
  fontSize: "24px",
  textAlign: "left" as const,
  fontWeight: "bold",
};

const button = {
  backgroundColor: "#656ee8",
  borderRadius: "5px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "10px",
};
