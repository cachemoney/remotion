import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import { CreateVideoInternals } from "create-video";
import React from "react";
import { IconForTemplate } from "../../components/IconForTemplate";
import { Seo } from "../../components/Seo";
import styles from "./styles.module.css";

const content: React.CSSProperties = {
  maxWidth: 1000,
  margin: "auto",
  padding: "0 20px",
};

const para: React.CSSProperties = {
  textAlign: "center",
  marginBottom: 50,
};

const lowerpara: React.CSSProperties = {
  textAlign: "center",
  color: "var(--light-text-color)",
};

export default () => {
  const imgSrc = `/generated/template-all.png`;
  const context = useDocusaurusContext();

  return (
    <Layout>
      <Head>
        {Seo.renderTitle(`Starter Templates | Remotion`)}
        {Seo.renderDescription(
          "Jumpstart your Remotion project with a template."
        )}
        {Seo.renderImage(imgSrc, context.siteConfig.url)}
      </Head>
      <div style={content}>
        <h1 className={styles.title}>
          Find the right
          <br />
          template
        </h1>
        <p style={para}>
          Jumpstart your project with a template that fits your usecase.
        </p>
        <div className={styles.grid}>
          {CreateVideoInternals.FEATURED_TEMPLATES.map((template) => {
            return (
              <Link
                key={template.cliId}
                className={styles.item}
                style={outer}
                to={`/templates/${template.cliId}`}
              >
                <Item
                  label={template.homePageLabel}
                  description={template.description}
                >
                  <IconForTemplate scale={0.7} template={template} />
                </Item>
              </Link>
            );
          })}
        </div>
        <br />
        <p style={lowerpara}>
          {"Couldn't"} find what you need? Check out the list of{" "}
          <Link to={"/docs/resources"}>Resources</Link>.
        </p>
      </div>
      <br />
    </Layout>
  );
};

const Item: React.FC<{
  label: string;
  description: React.ReactNode;
  children: React.ReactNode;
}> = ({ children, label, description }) => {
  return (
    <div>
      <div
        style={{ flexDirection: "row", display: "flex", alignItems: "center" }}
      >
        <div style={icon}>{children}</div>
        <div style={labelStyle}>{label}</div>
      </div>
      <div>
        <p style={descriptionStyle}>{description}</p>
      </div>
    </div>
  );
};

const outer: React.CSSProperties = {
  display: "flex",
  cursor: "pointer",
  color: "var(--text-color)",
  textDecoration: "none",
};

const icon: React.CSSProperties = {
  display: "flex",
  margin: 0,
  marginRight: 10,
  height: 30,
  width: 30,
  justifyContent: "center",
  alignItems: "center",
};

const labelStyle: React.CSSProperties = {
  fontWeight: "bold",
};

const descriptionStyle: React.CSSProperties = {
  fontSize: 14,
  marginTop: 10,
  color: "var(--light-text-color)",
  marginBottom: 10,
};
