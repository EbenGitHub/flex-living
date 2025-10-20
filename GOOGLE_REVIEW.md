# Google Review Findings

I explored how to retrieve Google Reviews using the Places API after reviewing the [documentation](https://developers.google.com/maps/documentation/javascript/place-reviews).
I’m already familiar with the Places API since I’ve previously worked on address autocomplete features.

But, the API requires a Google Cloud project with billing enabled, and since my current Mastercard is prepaid, I wasn’t able to test it directly.

From my research, here’s what I found:

1. We need to create a Google Cloud project with billing and enable the Places API.

2. Then, generate an API key (a process I’m very familiar with from previous location autocomplete integrations).

3. Using that key, we can make direct API calls via fetch / axios or use the Google Cloud SDKs.

4. To keep the API key secure, I'd handle requests through a backend service or nextjs server action instead of calling the API directly from the frontend (to prevent exposing the api key).

Thank you
