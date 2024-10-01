import { validate as uuidValidate } from 'uuid';
import { InvalidUuidError, Uuid } from "../uuid.vo";

describe("UUID Unit Tests", () => {
  const validateSpy = jest.spyOn(Uuid.prototype as any, "validate");

  it("should throw error when invalid UUID", () => {
    expect(() => new Uuid("invalid-uuid")).toThrow(new InvalidUuidError());
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });

  it("should create a new UUID", () => {
    const uuid = new Uuid();
    expect(uuid.id).toBeDefined();
    expect(uuidValidate(uuid.id)).toBe(true);
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });

  it("should create a UUID from a string", () => {
    const uuid = new Uuid("f1d1e1c0-7add-11eb-9439-0242ac130002");
    expect(uuid.id).toBe("f1d1e1c0-7add-11eb-9439-0242ac130002");
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });
});