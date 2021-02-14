import { Mixin } from 'ts-mixer';
import SameOriginDesktopAPI, { DesktopAPI } from './DesktopAPI';
import SameOriginMobileAPI, { MobileAPI } from './MobileAPI';

export default class API extends Mixin(SameOriginDesktopAPI, SameOriginMobileAPI) implements DesktopAPI, MobileAPI {

}