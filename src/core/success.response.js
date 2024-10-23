const StatusCode = {
  OK: 200,
  CREATED: 201,
};

const ReasonStatusCode = {
  OK: 'Success',
  CREATED: 'Created!',
};

class SuccessResponse {
  constructor({
    message = ReasonStatusCode.OK,
    statusCode = StatusCode.OK,
    reasonStatusCode = ReasonStatusCode.OK,
    metadata = {},
  }) {
    this.message = message;
    this.statusCode = statusCode;
    this.reasonStatusCode = reasonStatusCode;
    this.metadata = metadata;
  }

  send(res, headers = {}) {
    // Optionally set headers if provided
    Object.keys(headers).forEach(key => res.setHeader(key, headers[key]));
    return res.status(this.statusCode).json({
      message: this.message,
      reason: this.reasonStatusCode,
      metadata: this.metadata,
    });
  }
}

class OK extends SuccessResponse {
  constructor({ message, metadata } = {}) {
    super({ message: message || ReasonStatusCode.OK, metadata });
  }
}

class CREATED extends SuccessResponse {
  constructor({ message, metadata, options = {} } = {}) {
    super({
      message: message || ReasonStatusCode.CREATED,
      statusCode: StatusCode.CREATED,
      reasonStatusCode: ReasonStatusCode.CREATED,
      metadata,
    });
    this.options = options;
  }
}

export { CREATED, OK };
