import { redisStore } from "cache-manager-redis-store";
import { AppConfigService } from "../config/config.service";
import { AppConfigModule } from "../config/config.module";
import { CacheModuleAsyncOptions } from "@nestjs/cache-manager";


export const RedisOptions: CacheModuleAsyncOptions = {
    isGlobal: true,
    imports: [AppConfigModule],
    useFactory: async (configService: AppConfigService) => {
      const store = await redisStore({
        socket: {
          host: configService.REDIS_HOST,
          port: configService.REDIS_PORT
        },
      });
      return {
        store: () => store,
      };
    },
    inject: [AppConfigService],
  };