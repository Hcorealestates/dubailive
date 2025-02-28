export const revalidate = 60
export default async function sitemap() {
   const projectxml = getXmlForProject();
   const xmldata = await projectxml
   return xmldata
}

async function getXmlForProject() {
   const formData = new URLSearchParams();
   formData.append('token1', process.env.token1);
   formData.append('token2', process.env.token2);
   const finalresult = await fetch(process.env.API_URL+'properties/xmldata/', {
      next: { revalidate: 60 },
      method: 'POST',
      headers: {
         'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
   });  
   return finalresult.json();
}