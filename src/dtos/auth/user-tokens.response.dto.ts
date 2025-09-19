import { AuthPayloadDto } from './payload-jwt.dto';

export class RequestWithRefreshUser extends Request {
  user: AuthPayloadDto;
}
