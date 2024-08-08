# typescript 使用

### 示例实践

```typescript
// 1.5编程：(*p)=>f(p)
interface ILogger {
  info: (self: unknown, msg: string) => void;
}

let info = (logger: Logger, msg: string) => {
  logger.interface.info(logger, msg);
};

type Logger = {
  interface: ILogger;
};

// 实现1-date
type DateLogger = {
  interface: ILogger;
  current_date: Date;
};

let date_logger_dynamic_info = {
  info: (self: DateLogger, msg: string) => {
    console.log(`[${self.current_date.toISOString()}] Hello`);
  },
} as ILogger;
let Logger1: DateLogger = {
  interface: date_logger_dynamic_info,
  current_date: new Date(),
};
info(Logger1, 'Hello');

// 实现2-tag
type TagLogger = {
  interface: ILogger;
  tag: string;
};
let tag_logger_dynamic_info = {
  info: (self: TagLogger, msg: string) => {
    console.log(`[${self.tag}] Hello`);
  },
} as ILogger;
let Logger2: TagLogger = { interface: tag_logger_dynamic_info, tag: 'tag' };
info(Logger2, 'Hello');
```
