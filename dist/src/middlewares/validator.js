import { EValidatorType } from '../enum/_enum.js';
import { ErrorHandler } from '../libraries/errors/_errors.js';
import { Wrapper } from '../utils/wrapper.js';
const validator = (options) => Wrapper((req, res, next) => {
    try {
        const validate = (schema) => {
            switch (schema.type) {
                case EValidatorType.QueryParameter:
                    req.query = schema.schema.parse(req.query);
                    break;
                case EValidatorType.PathParameter:
                    req.params = schema.schema.parse(req.params);
                    break;
                case EValidatorType.RequestBody:
                    req.body = schema.schema.parse(req.body);
                    break;
            }
        };
        if (Array.isArray(options)) {
            for (const schema of options) {
                validate(schema);
            }
        }
        else {
            validate(options);
        }
    }
    catch (error) {
        throw new ErrorHandler({
            code: 400,
            details: error.issues,
            message: 'BAD_REQUEST',
        });
    }
    return next();
});
export { validator };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21pZGRsZXdhcmVzL3ZhbGlkYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRTdDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBT3hDLE1BQU0sU0FBUyxHQUFHLENBQUMsT0FBZ0QsRUFBRSxFQUFFLENBQ3JFLE9BQU8sQ0FBQyxDQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0IsRUFBRSxFQUFFO0lBQzFELElBQUksQ0FBQztRQUNILE1BQU0sUUFBUSxHQUFHLENBQUMsTUFBeUIsRUFBRSxFQUFFO1lBQzdDLFFBQVEsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNwQixLQUFLLGNBQWMsQ0FBQyxjQUFjO29CQUNoQyxHQUFHLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDM0MsTUFBTTtnQkFDUixLQUFLLGNBQWMsQ0FBQyxhQUFhO29CQUMvQixHQUFHLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDN0MsTUFBTTtnQkFDUixLQUFLLGNBQWMsQ0FBQyxXQUFXO29CQUM3QixHQUFHLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDekMsTUFBTTtZQUNWLENBQUM7UUFDSCxDQUFDLENBQUM7UUFFRixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztZQUMzQixLQUFLLE1BQU0sTUFBTSxJQUFJLE9BQU8sRUFBRSxDQUFDO2dCQUM3QixRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbkIsQ0FBQztRQUNILENBQUM7YUFBTSxDQUFDO1lBQ04sUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3BCLENBQUM7SUFDSCxDQUFDO0lBQUMsT0FBTyxLQUFVLEVBQUUsQ0FBQztRQUNwQixNQUFNLElBQUksWUFBWSxDQUFDO1lBQ3JCLElBQUksRUFBRSxHQUFHO1lBQ1QsT0FBTyxFQUFFLEtBQUssQ0FBQyxNQUFZO1lBQzNCLE9BQU8sRUFBRSxhQUFhO1NBQ3ZCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxPQUFPLElBQUksRUFBRSxDQUFDO0FBQ2hCLENBQUMsQ0FBQyxDQUFDO0FBRUwsT0FBTyxFQUFFLFNBQVMsRUFBRSxDQUFDIn0=