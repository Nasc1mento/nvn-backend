import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";


export abstract class IAppConfig {
    PORT: number;
    MONGO_URI: string;
    REDIS_HOST: string;
    REDIS_PORT: string;
    JWT_SECRET: string;
    JWT_EXPIRE_IN: string | number;
    SSL_KEY_PATH: string;
    SSL_CERT_PATH: string;
}

@Injectable()
export class AppConfigService extends ConfigService implements IAppConfig {
    PORT = this.get('PORT');
    MONGO_URI = this.get('MONGO_URI');
    REDIS_HOST = this.get('REDIS_HOST');
    REDIS_PORT = this.get('REDIS_PORT');
    JWT_SECRET = this.get('JWT_SECRET');
    JWT_EXPIRE_IN = this.get<string | number>('JWT_EXPIRE_IN', { infer: true });
    SSL_KEY_PATH = this.get('SSL_KEY_PATH');
    SSL_CERT_PATH = this.get('SSL_CERT_PATH');
} 