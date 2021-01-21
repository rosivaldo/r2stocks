export default async function index(request, response) {
    
    const apiSecret = process.env.API_SECRET;
    const selfSecret = process.env.SELF_SECRET;
    
    const {
        query: { ticker },
    } = request;

    const payload = {"ticker": ticker[0], "prop": ticker[1] };

    if (request.query.key == selfSecret) {
        const tickerResponse = await fetch(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${payload.ticker}&apikey=${apiSecret}`);
        const tickerResponseJSON = await tickerResponse.json();

        const output = tickerResponseJSON[payload.prop];
        response.status(200).json(output);
    } else {
        response.status(401).json({
            error: "Unauthorized"
        });
    }
}