<script context="module">
	export async function load({ params }) {
		const { word } = params;
		// Fetch the details for the word and pass it to the component
		const details = await fetchDetailsForWord(word);
		return {
			props: {
				details
			}
		};
	}
</script>

<script>
	export let details;
	// details prop will have the details for the word
</script>

<!-- Display the details for the word -->
<p>{details}</p>
