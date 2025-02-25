const emailConfig = {
  endpoint: "https://tbs-email-api-gateway.omb.to/email/v1/send_template",
  template_uuid: "25022223-5154-8b98-9ddd-8d108b85126d",
  mail_from: {
    email: "no-reply@dresssense.in.th",
    name: "Dresssense no-reply",
  },
  verifyUrl: "www.dresssense.in.th/verify/{{token}}",
} as const;

export default emailConfig;
