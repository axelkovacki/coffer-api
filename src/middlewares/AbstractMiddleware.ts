export default abstract class AbstractMiddleware {
    abstract handler(request: any, response: any): any;
}
