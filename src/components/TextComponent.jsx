export default function TextComponent({ itemObj, className = '' }) {
   return <div className={className} dangerouslySetInnerHTML={{ __html: itemObj }} />;
}