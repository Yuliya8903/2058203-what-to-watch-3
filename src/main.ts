import 'reflect-metadata';
import Application from '../app/application.js';
import { ConfigInterface } from '../src/common/config/config.interface.js';
import ConfigService from './common/config/config.service.js';
import {LoggerInterface} from '../src/common/logger/logger.interface.js';
import LoggerService from './common/logger/logger.service.js';
import {Component} from '../src/types/component.type.js';
import { Container } from 'inversify';

const applicationContainer = new Container();

applicationContainer.bind<Application>(Component.Application).to(Application).inSingletonScope();
applicationContainer.bind<LoggerInterface>(Component.LoggerInterface).to(LoggerService).inSingletonScope();
applicationContainer.bind<ConfigInterface>(Component.ConfigInterface).to(ConfigService).inSingletonScope();

const application = applicationContainer.get<Application>(Component.Application);await application.init();
