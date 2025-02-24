export default function WhatsappLink({ phoneNumber, message = 'Dubai Housing', children, className }) {

  const encodedMessage = encodeURIComponent(`I want more information on ${message}.`);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
  return <>
    <a href={whatsappUrl} className={className} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  </>
}