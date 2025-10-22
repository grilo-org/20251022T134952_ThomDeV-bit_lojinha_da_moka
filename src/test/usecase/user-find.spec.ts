import { Test } from '@nestjs/testing';
import { UserRepository } from '../../database/reposiotory/user/user.repository';
import { UserCreateUseCase } from '../../use-case/user/user-create-usecase'
import { TYPEORM_TOKENS } from '../../database/reposiotory/tokens'
import { mock } from 'jest-mock-extended';
import { UserEntity } from 'src/database/entities/user.entity';
import { UserSearchUseCase } from '../../use-case/user/user-find-usecase';

describe('UserUsecase', () => {
    const userRepository = mock<UserRepository>();
    let userSearchUseCase: UserSearchUseCase;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                UserSearchUseCase,
                {
                    provide: TYPEORM_TOKENS.USER_REPOSITORY,
                    useValue: userRepository
                },

            ]
        }).compile();

        userSearchUseCase = moduleRef.get<UserSearchUseCase>(UserSearchUseCase);
    });
    afterEach(() => {
        jest.clearAllMocks()
    })
    it('O usuario deve possuir senha e email', async () => {
        const userEntityMock: UserEntity[] = [{
            id: '',
            name: 'thomaz',
            email: 'thomaz@@',
            phone: '65998787777',
            password: '',
            userPermissions: []
        }]

        jest.spyOn(userRepository, 'findAll').mockImplementation(async () => userEntityMock)
        const result = await userSearchUseCase.find()
        console.log(result)
        expect(result).toEqual(userEntityMock)
        expect(userRepository.findAll).toHaveBeenCalledTimes(1)
    })

}
)
