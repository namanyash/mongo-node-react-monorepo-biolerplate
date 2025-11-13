import React, { FC } from "react";
import { GitBranch, Cloud, Settings, Zap, Search, Wrench, Upload, Monitor, Rocket, Shield } from "lucide-react";
import { PageContainer } from "../../components/PageContainer";
import { ServiceHero } from "./components/ServiceHero";
import { FeatureGrid } from "./components/FeatureGrid";
import { TechStack } from "./components/TechStack";
import { ProcessFlow } from "./components/ProcessFlow";
import { ServiceCTA } from "./components/ServiceCTA";
import { StatsSection } from "./components/StatsSection";

interface ServicePageProps {
  serviceType: string;
}

export const ServicePage: FC<ServicePageProps> = ({ serviceType }) => {
  const getServiceData = (type: string) => {
    switch (type) {
      case "code-to-prod":
        return {
          title: "Code to Production",
          description: "Seamless deployment pipelines from development to production with automated testing, security scanning, and zero-downtime deployments.",
          icon: <GitBranch className="w-12 h-12" />,
          gradient: "from-green-400 to-blue-500",
          features: ["Automated CI/CD Pipeline Setup", "Git Workflow Optimization", "Automated Testing Integration", "Production Deployment Automation", "Rollback & Recovery Strategies", "Environment Management", "Security Scanning & Compliance", "Performance Monitoring", "Blue-Green Deployments"],
          technologies: ["Jenkins", "GitHub Actions", "GitLab CI", "Azure DevOps", "Docker", "Kubernetes", "Terraform", "Ansible"],
          process: [
            {
              title: "Assessment",
              description: "Analyze your current development workflow and identify optimization opportunities",
              icon: <Search className="w-8 h-8" />,
            },
            {
              title: "Pipeline Design",
              description: "Design automated CI/CD pipelines tailored to your technology stack",
              icon: <Wrench className="w-8 h-8" />,
            },
            {
              title: "Implementation",
              description: "Set up and configure your deployment infrastructure with best practices",
              icon: <Upload className="w-8 h-8" />,
            },
            {
              title: "Optimization",
              description: "Monitor, measure, and continuously improve your deployment process",
              icon: <Monitor className="w-8 h-8" />,
            },
          ],
          stats: [
            {
              number: "75%",
              label: "Faster Deployments",
              description: "Average reduction in deployment time",
            },
            {
              number: "99.9%",
              label: "Uptime Achieved",
              description: "High availability with automated rollbacks",
            },
            {
              number: "50+",
              label: "Projects Delivered",
              description: "Successfully implemented CI/CD pipelines",
            },
          ],
        };

      case "iac":
        return {
          title: "Infrastructure as Code",
          description: "Automated, scalable, and version-controlled infrastructure that grows with your business needs and ensures consistent environments.",
          icon: <Cloud className="w-12 h-12" />,
          gradient: "from-blue-400 to-purple-500",
          features: ["Terraform Infrastructure Automation", "AWS CloudFormation Templates", "Azure Resource Manager (ARM)", "Infrastructure Version Control", "Multi-Environment Management", "Cost Optimization Strategies", "Auto-scaling Configuration", "Disaster Recovery Planning", "Compliance & Security Hardening"],
          technologies: ["Terraform", "CloudFormation", "ARM Templates", "Pulumi", "Ansible", "Chef", "AWS CDK", "Azure Bicep"],
          process: [
            {
              title: "Infrastructure Audit",
              description: "Review current infrastructure and identify areas for automation",
              icon: <Search className="w-8 h-8" />,
            },
            {
              title: "IaC Design",
              description: "Design modular, reusable infrastructure code templates",
              icon: <Wrench className="w-8 h-8" />,
            },
            {
              title: "Automation Setup",
              description: "Implement infrastructure provisioning and management automation",
              icon: <Rocket className="w-8 h-8" />,
            },
            {
              title: "Governance",
              description: "Establish policies, monitoring, and cost optimization practices",
              icon: <Shield className="w-8 h-8" />,
            },
          ],
          stats: [
            {
              number: "60%",
              label: "Cost Reduction",
              description: "Average infrastructure cost savings",
            },
            {
              number: "10x",
              label: "Faster Provisioning",
              description: "Automated vs manual infrastructure setup",
            },
            {
              number: "100%",
              label: "Environment Consistency",
              description: "Identical dev, staging, and production environments",
            },
          ],
        };

      case "consulting":
        return {
          title: "CI/CD Consulting",
          description: "Expert guidance to optimize your continuous integration and deployment workflows, reduce bottlenecks, and accelerate delivery cycles.",
          icon: <Settings className="w-12 h-12" />,
          gradient: "from-purple-400 to-pink-500",
          features: ["Pipeline Architecture Design", "Build & Test Optimization", "Deployment Strategy Consulting", "Performance & Security Audits", "Team Training & Best Practices", "Tool Selection & Integration", "Legacy System Modernization", "DevOps Culture Transformation", "Compliance & Governance"],
          technologies: ["Jenkins", "GitHub Actions", "GitLab CI", "Azure DevOps", "CircleCI", "TeamCity", "Bamboo", "Travis CI"],
          process: [
            {
              title: "Current State Analysis",
              description: "Comprehensive assessment of your existing CI/CD processes",
              icon: <Search className="w-8 h-8" />,
            },
            {
              title: "Strategy Development",
              description: "Create customized roadmap for CI/CD optimization",
              icon: <Wrench className="w-8 h-8" />,
            },
            {
              title: "Implementation Support",
              description: "Hands-on guidance during transformation process",
              icon: <Upload className="w-8 h-8" />,
            },
            {
              title: "Knowledge Transfer",
              description: "Train your team on best practices and ongoing optimization",
              icon: <Monitor className="w-8 h-8" />,
            },
          ],
          stats: [
            {
              number: "80%",
              label: "Faster Releases",
              description: "Improvement in release cycle time",
            },
            {
              number: "90%",
              label: "Defect Reduction",
              description: "Fewer production issues with better testing",
            },
            {
              number: "200+",
              label: "Teams Trained",
              description: "Development teams upskilled in DevOps practices",
            },
          ],
        };

      case "dashboards":
        return {
          title: "Custom Dashboards",
          description: "Real-time visibility across all your development platforms with custom dashboards that provide actionable insights and comprehensive monitoring.",
          icon: <Zap className="w-12 h-12" />,
          gradient: "from-cyan-400 to-blue-500",
          features: ["GitHub/Bitbucket Integration", "AWS/Azure Monitoring Dashboards", "Kubernetes Cluster Visibility", "Real-time Performance Metrics", "Custom Alert Systems", "Multi-Platform Analytics", "Business Intelligence Integration", "Mobile-Responsive Design", "Role-Based Access Control"],
          technologies: ["Grafana", "Prometheus", "Datadog", "New Relic", "Splunk", "Kibana", "CloudWatch", "Azure Monitor"],
          process: [
            {
              title: "Requirements Analysis",
              description: "Identify key metrics and stakeholder visualization needs",
              icon: <Search className="w-8 h-8" />,
            },
            {
              title: "Dashboard Design",
              description: "Create intuitive, actionable dashboard layouts and workflows",
              icon: <Wrench className="w-8 h-8" />,
            },
            {
              title: "Integration Setup",
              description: "Connect data sources and implement real-time monitoring",
              icon: <Upload className="w-8 h-8" />,
            },
            {
              title: "Optimization",
              description: "Fine-tune alerts, performance, and user experience",
              icon: <Monitor className="w-8 h-8" />,
            },
          ],
          stats: [
            {
              number: "70%",
              label: "Faster Issue Detection",
              description: "Reduced mean time to detection (MTTD)",
            },
            {
              number: "100+",
              label: "Custom Dashboards",
              description: "Tailored monitoring solutions delivered",
            },
            {
              number: "24/7",
              label: "Real-time Monitoring",
              description: "Continuous visibility across all platforms",
            },
          ],
        };

      default:
        return {
          title: "Service",
          description: "Professional DevOps solutions tailored to your needs",
          icon: <Settings className="w-12 h-12" />,
          gradient: "from-blue-400 to-purple-500",
          features: [],
          technologies: [],
          process: [],
          stats: [],
        };
    }
  };

  const serviceData = getServiceData(serviceType);

  return (
    <PageContainer>
      <ServiceHero title={serviceData.title} description={serviceData.description} icon={serviceData.icon} gradient={serviceData.gradient} />

      <FeatureGrid features={serviceData.features} />

      <ProcessFlow steps={serviceData.process} />

      <TechStack technologies={serviceData.technologies} />

      <StatsSection stats={serviceData.stats} />

      <ServiceCTA gradient={serviceData.gradient} />
    </PageContainer>
  );
};
