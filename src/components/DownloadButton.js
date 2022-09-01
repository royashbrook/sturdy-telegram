import { InteractiveBrowserCredential } from "@azure/identity"
import { BlobServiceClient } from '@azure/storage-blob'
import { blob as config } from "../stores/config/config";

export const downloadBlob = async (blobName) => {

  const { endpoint, containerId, tenantId, clientId } = config
  const aadCredentials = new InteractiveBrowserCredential({ tenantId, clientId })

  const client = new BlobServiceClient(endpoint, aadCredentials)
  const container = client.getContainerClient(containerId)
  const blob = container.getBlobClient(blobName)
  await blob.download()
    .then(x => x.blobBody)
    .then(x => URL.createObjectURL(x))
    .then(x => window.open(x, "_self"))
    .catch((err) => console.error(err))

}