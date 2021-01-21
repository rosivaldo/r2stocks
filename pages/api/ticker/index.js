export default function index(request, response) {
    response.status(401).json({
        error: "Unauthorized"
    });
}