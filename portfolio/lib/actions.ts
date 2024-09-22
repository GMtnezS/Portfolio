'use server'

import { z } from 'zod'
import { Resend } from 'resend'
import { ContactFormSchema, NewsletterFormSchema } from '@/lib/schemas'
import ContactFormEmail from '@/emails/contact-form-email'

const emailKey = process.env.RESEND_API_KEY;

type ContactFormInputs = z.infer<typeof ContactFormSchema>
type NewsletterFormInputs = z.infer<typeof NewsletterFormSchema>
const resend = new Resend(emailKey)

export async function sendEmail(data: ContactFormInputs) {
  // Validate the incoming data using Zod schema
  const result = ContactFormSchema.safeParse(data);

  // If validation fails, return the error formatted as a plain object
  if (!result.success) {
    return { error: result.error.format() };
  }

  try {
    const { name, email, message } = result.data;

    // Sending the email using the Resend API
    const { data: responseData, error } = await resend.emails.send({
      from: 'gmtnezs@gmtnezschez.com',
      to: [email],
      cc: ['gmtnezs@gmtnezschez.com'],
      subject: 'Contact form submission',
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      react: ContactFormEmail({ name, email, message }), // Assuming this is a valid React component
    });
    console.log(responseData || error)
    // If the email sending fails, throw an error
    if (!responseData || error) {
      throw new Error('Failed to send email');
    }

    // Return a plain object on success
    return { success: true };
  } catch (error) {
    // Handle any errors and return them as a plain object
    return { error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function subscribe(data: NewsletterFormInputs) {
  const result = NewsletterFormSchema.safeParse(data);

  if (result.error) {
    // Format the Zod error into a serializable plain object
    return { error: result.error.format() };
  }

  try {
    const { email } = result.data;
    const { data: contactData, error: contactError } = await resend.contacts.create({
      email,
      audienceId: process.env.RESEND_AUDIENCE_ID as string,
    });

    if (!contactData || contactError) {
      throw new Error(`Failed to subscribe: ${contactError?.message || 'Unknown error'}`);
    }

    // TODO: Send a welcome email

    return { success: true };
  } catch (error) {
    // Instead of passing the error object directly, serialize it into a plain object with a message
    return { error: (error as Error).message || 'An unknown error occurred' };
  }
}
