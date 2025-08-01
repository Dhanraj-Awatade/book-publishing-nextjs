import { Html, Preview, Body, Container, Img, Text, Head, Hr, Section, Button, render } from '@react-email/components'
import React from 'react'

interface PrimaryEmailProps {
    actionLabel: string,
    buttonText: string,
    href: string
}

export const PrimaryActionEmail = ({ actionLabel, buttonText, href }: PrimaryEmailProps) => {
    return (
        <Html>
            <Head />
            <Preview>The marketplace for high-quality Books & e-Books.</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Img
                        src={`${process.env.NEXT_PUBLIC_SERVER_URL}/Images/logo.png`}
                        width="150"
                        height="150"
                        alt="Saptarshee Publications"
                        style={logo}
                    />
                    <Text style={paragraph}>Hi there,</Text>
                    <Text style={paragraph}>
                        Welcome to Saptarshee Publications, the marketplace for high quality Books & e-Books. Use the button below to {actionLabel}.
                    </Text>
                    <Section style={btnContainer}>
                        <Button style={button} href={href}>
                            {buttonText}
                        </Button>
                    </Section>
                    <Text style={paragraph}>
                        Best Regards,
                        <br />
                        The Saptarshee Publications team
                    </Text>
                    <Hr style={hr} />
                    <Text style={footer}>
                        If you did not request this email, you can safely ignore it.
                    </Text>
                </Container>
            </Body>
        </Html>)
}

export const PrimaryActionEmailHtml = (props: PrimaryEmailProps) => render(<PrimaryActionEmail {...props} />, { pretty: true })

const main = {
    backgroundColor: "#ffffff",
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
    margin: "0 auto",
    padding: "20px 0 48px",
};

const logo = {
    margin: "0 auto",
};

const paragraph = {
    fontSize: "16px",
    lineHeight: "26px",
};

const btnContainer = {
    textAlign: "center" as const,
};

const button = {
    padding: "12px 12px",
    backgroundColor: "#2563eb",
    borderRadius: "3px",
    color: "#fff",
    fontSize: "16px",
    textDecoration: "none",
    textAlign: "center" as const,
    display: "block",
};

const hr = {
    borderColor: "#cccccc",
    margin: "20px 0",
};

const footer = {
    color: "#8898aa",
    fontSize: "12px",
};