# New Project

✨ Project template using:

- [Svelte](https://svelte.dev)
- [Snowpack](https://snowpack.dev/)
- [Simple.css](https://simplecss.org/)
- [svelte-spa-router](https://github.com/ItalyPaleAle/svelte-spa-router)
- [@azure/identity](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity)
- [@azure/cosmos](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/cosmosdb/cosmos)
- [@azure/storage-blob](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/storage/storage-blob)

This project is based on [laughing-barnacle](https://github.com/royashbrook/laughing-barnacle).

It provides an example of:

- A SPA application that
- Authenticates to azure using @azure/identity
- Searches CosmosDB indexes using @azure/cosmos
- Downloads files from @azure/storage-blob

# Install

## Overview

Installation is pretty simple once you have things setup. See [laughing-barnacle](https://github.com/royashbrook/laughing-barnacle) for initial setup comments. Note that you will have to have Cosmos and Azure Storage setup properly as well.

- Clone this repository however you prefer
- `npm install`
- configure `config.js` with your ids
- `npm run start` and you are good to go!

## config.js

See [laughing-barnacle](https://github.com/royashbrook/laughing-barnacle) for more details before continuing on cosmosdb and azure storage setup.

```js
const tenantId = 'your tenant id'
const clientId = 'your client id'
export const cosmos = {
  endpoint: 'https://xxxxxx.documents.azure.com',
  databaseId: 'your cosmos db',
  containerId: 'your cosmos container',
  tenantId: tenantId,
  clientId: clientId,
}
export const blob = {
  endpoint: 'https://xxxxxx.blob.core.windows.net',
  containerId: 'your blob container',
  tenantId: tenantId,
  clientId: clientId,
}
```

## additional config

You will also need to provision access to the user in question. For blob storage, you can simply use the azure portal to give access to the user on the container in question. They will need `Storage Blob Data Reader` role to read the files out. For Cosmos, it's a bit more complicated as there is currently no way to provide this access int he azure portal, so you have to use powershell. Below is a powershell script for this:

```powershell
#az cosmosdb sql role assignment list --account-name frtl --resource-group rg-cosmos-01
$resourceGroupName='resource group for your cosmos db'
$accountName='cosmos db name'
$principalId = 'prinicpal id for your app or user. you can get these from the azure record for user or app'
$readOnlyRoleDefinitionId = '00000000-0000-0000-0000-000000000001'
az cosmosdb sql role assignment create `
--account-name $accountName `
--resource-group $resourceGroupName `
--scope "/" `
--principal-id $principalId `
--role-definition-id $readOnlyRoleDefinitionId
```

More details on this [here](https://docs.microsoft.com/en-us/azure/cosmos-db/how-to-setup-rbac)

# See it

Unfortunately, since part of the pattern here is auto-authentication using MSAL, you'll just keep seeing a 'redirect' to the microsoft login or an error in the console. But you can set things up yourself and deploy a copy to vercel to see it. =)

[![vercel deployment](https://therealsujitk-vercel-badge.vercel.app/?app=laughing-barnacle&style=for-the-badge)](https://musical-tribble.vercel.app/)

https://musical-tribble.vercel.app/

Screenshot of the vercel site after I hit the button:

After auto login and getting secrets, default page shows like:

![image](https://user-images.githubusercontent.com/7390156/168331161-951ba2e3-6a59-4c07-a5b7-38091630b75f.png)

Then after typing some text and hitting enter:

![image](https://user-images.githubusercontent.com/7390156/168331259-9dd177dc-cc37-461a-b546-68618cfe62f3.png)

Changing criteria and hitting enter return fresh results. As this is just a sample, the file data in cosmos simply has a field called `searchTerms` which has a word list in it that we wildcard search. So searching for something like just the letter `g` will bring back more search results like:

![image](https://user-images.githubusercontent.com/7390156/168331695-fc76c488-ebf9-49ed-a01c-b8a954ec2a3d.png)

The download buttons are anchor wrapped buttons that use the SAS token to generate a direct link with a `target="blank"` so they will behave like any other link.

# Note

When deploying to vercel, ensure the output folder name matches. As configured currently, this template requires the override be set on a project of type 'other' on vercel config.

![image](https://user-images.githubusercontent.com/7390156/165202229-99bf3c00-2c8a-4185-84b4-c0ed31a87c15.png)
