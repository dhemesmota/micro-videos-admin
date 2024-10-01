import { Uuid } from "../../../shared/domain/value-objects/uuid.vo";
import { Category } from "../category.entity";

describe('Category Unit Tests', () => {
  let validateSpy: any;
  beforeEach(() => {
    validateSpy = jest.spyOn(Category, 'validate')
  })

  describe('constructor', () => {
    it('should create a new category', () => {
      let category = new Category({
        name: 'Movie'
      })
  
      expect(category.category_id).toBeInstanceOf(Uuid)
      expect(category.name).toBe('Movie')
      expect(category.description).toBeNull()
      expect(category.is_active).toBe(true)
      expect(category.created_at).toBeInstanceOf(Date)
    })

    it('should create a new category with description', () => {
      let category = new Category({
        name: 'Movie',
        description: 'Action'
      })
  
      expect(category.category_id).toBeInstanceOf(Uuid)
      expect(category.name).toBe('Movie')
      expect(category.description).toBe('Action')
      expect(category.is_active).toBe(true)
      expect(category.created_at).toBeInstanceOf(Date)
    })

    it('should create a new category with is_active', () => {
      let category = new Category({
        name: 'Movie',
        is_active: false
      })
  
      expect(category.category_id).toBeInstanceOf(Uuid)
      expect(category.name).toBe('Movie')
      expect(category.description).toBeNull()
      expect(category.is_active).toBe(false)
      expect(category.created_at).toBeInstanceOf(Date)
    })

    it('should create a new category with created_at', () => {
      let created_at = new Date()
      let category = new Category({
        name: 'Movie',
        created_at
      })
  
      expect(category.category_id).toBeInstanceOf(Uuid)
      expect(category.name).toBe('Movie')
      expect(category.description).toBeNull()
      expect(category.is_active).toBe(true)
      expect(category.created_at).toBe(created_at)
    })
  })

  describe('create command', () => {
    it('should create a new category', () => {
      let category = Category.create({
        name: 'Movie'
      })
  
      expect(category.category_id).toBeInstanceOf(Uuid)
      expect(category.name).toBe('Movie')
      expect(category.description).toBeNull()
      expect(category.is_active).toBe(true)
      expect(category.created_at).toBeInstanceOf(Date)
      expect(validateSpy).toBeCalledTimes(1)
    })

    it('should create a new category with description', () => {
      let category = Category.create({
        name: 'Movie',
        description: 'Action'
      })
  
      expect(category.category_id).toBeInstanceOf(Uuid)
      expect(category.name).toBe('Movie')
      expect(category.description).toBe('Action')
      expect(category.is_active).toBe(true)
      expect(category.created_at).toBeInstanceOf(Date)
    })

    it('should create a new category with is_active', () => {
      let category = Category.create({
        name: 'Movie',
        is_active: false
      })
  
      expect(category.category_id).toBeInstanceOf(Uuid)
      expect(category.name).toBe('Movie')
      expect(category.description).toBeNull()
      expect(category.is_active).toBe(false)
      expect(category.created_at).toBeInstanceOf(Date)
    })

  })

  describe("category_id field", () => {
    const arrange = [
      {category_id: null}, {category_id: undefined}, {category_id: new Uuid()}
    ]

    test.each(arrange)('should create a new category with category_id %p', ({category_id}) => {
      let category = new Category({
        name: 'Movie',
        category_id: category_id as any
      })
  
      expect(category.category_id).toBeInstanceOf(Uuid)
      if (category_id instanceof Uuid) {
        expect(category.category_id).toBe(category_id)
      }
    })
  })

  it('should change name', () => {
    let category = Category.create({
      name: 'Movie'
    })

    category.changeName('Music')

    expect(category.name).toBe('Music')
    expect(validateSpy).toBeCalledTimes(2)
  })

  it('should change description', () => {
    let category = Category.create({
      name: 'Movie'
    })

    category.changeDescription('Action')

    expect(category.description).toBe('Action')
    expect(validateSpy).toBeCalledTimes(2)
  })

  it('should activate', () => {
    let category = new Category({
      name: 'Movie'
    })

    category.deactivate()
    category.activate()

    expect(category.is_active).toBe(true)
  })

  it('should deactivate', () => {
    let category = new Category({
      name: 'Movie'
    })

    category.deactivate()

    expect(category.is_active).toBe(false)
  })
})

describe('Category Validator', () => {

  describe('create commnd', () => {
    it('should an invalid category with name property', () => {
      expect(() => Category.create({name: null})).containsErrorMessages({
        name: [
          'name should not be empty',
          'name must be a string',
          'name must be shorter than or equal to 255 characters',
        ]
      })

      expect(() => Category.create({name: ''})).containsErrorMessages({
        name: [
          'name should not be empty',
        ]
      })

      expect(() => Category.create({name: 'a'.repeat(256)})).containsErrorMessages({
        name: [
          'name must be shorter than or equal to 255 characters',
        ]
      })
    })

    it('should an invalid category with description property', () => {
      expect(() => Category.create({name: 'Movie', description: null})).containsErrorMessages({
        description: [
          'description must be a string',
        ]
      })

      expect(() => Category.create({name: 'Movie', description: ''})).containsErrorMessages({
        description: [
          'description should not be empty',
        ]
      })
    })

    it('should an invalid category with is_active property', () => {
      expect(() => Category.create({name: 'Movie', is_active: null})).containsErrorMessages({
        is_active: [
          'is_active must be a boolean',
        ]
      })
    })
  })

  describe('changeName method', () => {
    it('should an invalid category with name property', () => {
      let category = Category.create({name: 'Movie'})

      expect(() => category.changeName(null)).containsErrorMessages({
        name: [
          'name should not be empty',
          'name must be a string',
          'name must be shorter than or equal to 255 characters',
        ]
      })

      expect(() => category.changeName('')).containsErrorMessages({
        name: [
          'name should not be empty',
        ]
      })

      expect(() => category.changeName('a'.repeat(256))).containsErrorMessages({
        name: [
          'name must be shorter than or equal to 255 characters',
        ]
      })
    })
  })

  describe('changeDescription method', () => {
    it('should an invalid category with description property', () => {
      let category = Category.create({name: 'Movie'})

      expect(() => category.changeDescription(null)).containsErrorMessages({
        description: [
          'description must be a string',
        ]
      })

      expect(() => category.changeDescription('')).containsErrorMessages({
        description: [
          'description should not be empty',
        ]
      })
    })
  })
})