export const contactFormType = {
  name: 'contactForm',
  title: 'Prijaté správy',
  type: 'document',
  readOnly: true, // Admin by nemal správy prepisovať
  fields: [
    { name: 'name', title: 'Meno', type: 'string' },
    { name: 'email', title: 'Email', type: 'string' },
    { name: 'message', title: 'Správa', type: 'text' },
    { 
      name: 'submittedAt', 
      title: 'Odoslané dňa', 
      type: 'datetime', 
      initialValue: () => new Date().toISOString() 
    },
  ]
}