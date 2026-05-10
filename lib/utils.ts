export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export const contactLinks = {
  email: "mailto:helisondias07@gmail.com?subject=Contato%20via%20portfolio",
  gmail:
    "https://mail.google.com/mail/?view=cm&fs=1&to=helisondias07%40gmail.com&su=Contato%20via%20portfolio",
  emailAddress: "helisondias07@gmail.com",
  linkedin: "https://linkedin.com/in/helisondias",
};
