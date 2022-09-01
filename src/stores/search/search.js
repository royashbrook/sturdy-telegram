import { writable } from 'svelte/store';
import { InteractiveBrowserCredential } from "@azure/identity";
import { CosmosClient } from '@azure/cosmos'
import { cosmos as config } from "../config/config";

export const searchResults = writable(null);

export const getSearchResults = async (qry) => {
  
  const { endpoint, databaseId, containerId, tenantId, clientId } = config;
  const aadCredentials = new InteractiveBrowserCredential({ tenantId, clientId });
  const client = new CosmosClient({ endpoint, aadCredentials })
  const database = client.database(databaseId)
  const container = database.container(containerId)

  await container.items
    .query(qry)
    .fetchAll()
    .then(({ resources: items }) => searchResults.set(items))
    .catch((err) => console.error(err))

}
