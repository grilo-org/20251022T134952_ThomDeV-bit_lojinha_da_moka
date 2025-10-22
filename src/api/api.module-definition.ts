import { ConfigurableModuleBuilder, DynamicModule } from "@nestjs/common";

interface ModuleOptions {
    useCaseModule: DynamicModule;
}

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN, OPTIONS_TYPE } =
    new ConfigurableModuleBuilder<ModuleOptions>().build();