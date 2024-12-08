import { UserInterface } from '../types/user.interface';
import { UsersService } from './users.service';
import { TestBed } from '@angular/core/testing';
import { UtilsService } from './utils.service';
describe('UsersService', () => {
  let usersService: UsersService;

  // Create a mocked version of UtilsService with a partial mock for `pluck`
  let utilsServiceMock: jest.Mocked<Partial<UtilsService>> = {
    range: jest.fn(),
    pluck: jest.fn(),
  };

  beforeEach(() => {
    // Configure the testing module and inject the dependencies
    TestBed.configureTestingModule({
      providers: [
        UsersService,
        { provide: UtilsService, useValue: utilsServiceMock }, // Mocked UtilsService
      ],
    });

    // Inject the UsersService
    usersService = TestBed.inject(UsersService);
  });

  it('should create the service', () => {
    expect(usersService).toBeTruthy();
  });

  describe('addUser', () => {
    it('should add a user', () => {
      const user: UserInterface = {
        id: '3',
        name: 'foo',
      };
      usersService.addUser(user);
      expect(usersService.users).toEqual([{ id: '3', name: 'foo' }]);
    });
  });

  describe('removeUser', () => {
    it('should remove a user', () => {
      usersService.users = [{ id: '3', name: 'foo' }];
      usersService.removeUser('3');
      expect(usersService.users).toEqual([]);
    });
  });

  describe('getUsernames', () => {
    it('should get usernames', () => {
      // Mock the `pluck` method to return the usernames
      utilsServiceMock.pluck = jest.fn().mockReturnValue(['foo']);

      // Call the method and verify the output
      expect(usersService.getUsernames()).toEqual(['foo']);

      // Verify that `pluck` was called as expected
      expect(utilsServiceMock.pluck).toHaveBeenCalled();
    });
  });
});
