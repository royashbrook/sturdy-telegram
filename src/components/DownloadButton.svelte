<script>
  import { downloadBlob } from './DownloadButton.js'
  export let searchResult
  const f = searchResult['74']
  const blobName = [f.substring(0, 3), f.substring(3, 6), f].join('/')
  let buttonText = 'Download'
  let buttonDisabled = false

  const hc = async () => {
    buttonDisabled = true
    buttonText = 'Downloading...'
    await downloadBlob(blobName)
    setTimeout(function () {
      buttonText = 'Download'
      buttonDisabled = false
    }, 2000)
  }
</script>

<style>
  div {
    width: 12rem;
  }
</style>

<div>
  <button disabled={buttonDisabled} on:click={hc}>{buttonText}</button>
</div>
