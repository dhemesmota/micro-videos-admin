import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";
import { ClassValidatorFields } from "../../shared/domain/validators/class-validator-fields";
import { Category } from "./category.entity";

export class CategoryRoles {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string | null;

  @IsBoolean()
  @IsNotEmpty()
  is_active: boolean;

  constructor({
    name, description, is_active
  }: Category) {
    Object.assign(this, {
      name, description, is_active
    })
  }
}

export class CategoryValidator extends ClassValidatorFields<CategoryRoles> {
  validate(entity: Category) {
    return super.validate(new CategoryRoles(entity))
  }
}

export class CategoryValidatorFactory {
  static create() {
    return new CategoryValidator();
  }
}