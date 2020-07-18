// test() = it()
// teste unitario, cria o fake repository - n utiliza o BD 'real'
// import AppError from '@shared/errors/AppErrors';
import FakeAppointmentsRepository from '../repositories/fakes/fakeAppointmentsRepository'
import ListProviderDayAvaibilityServices from './ListProviderDayAvaibilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvaibility: ListProviderDayAvaibilityServices;

describe('ListProviderDayAvaibility', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderDayAvaibility = new ListProviderDayAvaibilityServices(
      fakeAppointmentsRepository
    );
  });

  it('should be able to list the day avaibility from providers', async () => {
    // criando agendamentos
    await fakeAppointmentsRepository.create({
      provider_id: "user",
      date: new Date(2020, 4, 20, 14, 0, 0),
    })

    await fakeAppointmentsRepository.create({
      provider_id: "user",
      date: new Date(2020, 4, 20, 15, 0, 0),
    })

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 20, 11).getTime();
    });

    //no services
    const availability = await listProviderDayAvaibility.execute({
      provider_id: "user",
      year: 2020,
      day: 20,
      month: 5,
    })

    expect(availability).toEqual(expect.arrayContaining([
      { hour: 8, availabla: false },
      { hour: 9, availabla: false },
      { hour: 10, availabla: false },
      { hour: 13, availabla: true },
      { hour: 14, availabla: false },
      { hour: 15, availabla: false },
      { hour: 16, availabla: true },
      ]),
    );
  });
});
