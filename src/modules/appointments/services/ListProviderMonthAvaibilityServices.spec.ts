// test() = it()
// teste unitario, cria o fake repository - n utiliza o BD 'real'
// import AppError from '@shared/errors/AppErrors';
import FakeAppointmentsRepository from '../repositories/fakes/fakeAppointmentsRepository'
import ListProviderMonthAvaibilityServices from './ListProviderMonthAvaibilityServices';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvaibility: ListProviderMonthAvaibilityServices;

describe('ListProviderMonthAvaibility', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvaibility = new ListProviderMonthAvaibilityServices(
      fakeAppointmentsRepository
    );
  });

  it('should be able to list the month avaibility from providers', async () => {
    // criando agendamentos
    await fakeAppointmentsRepository.create({
      provider_id: "user",
      date: new Date(2020, 4, 20, 8, 0, 0),
    })

    await fakeAppointmentsRepository.create({
      provider_id: "user",
      date: new Date(2020, 4, 20, 9, 0, 0),
    })

    await fakeAppointmentsRepository.create({
      provider_id: "user",
      date: new Date(2020, 4, 20, 10, 0, 0),
    })

    await fakeAppointmentsRepository.create({
      provider_id: "user",
      date: new Date(2020, 4, 20, 11, 0, 0),
    })

    await fakeAppointmentsRepository.create({
      provider_id: "user",
      date: new Date(2020, 4, 20, 12, 0, 0),
    })

    await fakeAppointmentsRepository.create({
      provider_id: "user",
      date: new Date(2020, 4, 20, 13, 0, 0),
    })

    await fakeAppointmentsRepository.create({
      provider_id: "user",
      date: new Date(2020, 4, 20, 14, 0, 0),
    })

    await fakeAppointmentsRepository.create({
      provider_id: "user",
      date: new Date(2020, 4, 20, 15, 0, 0),
    })

    await fakeAppointmentsRepository.create({
      provider_id: "user",
      date: new Date(2020, 4, 20, 16, 0, 0),
    })

    await fakeAppointmentsRepository.create({
      provider_id: "user",
      date: new Date(2020, 4, 20, 17, 0, 0),
    })

    await fakeAppointmentsRepository.create({
      provider_id: "user",
      date: new Date(2020, 4, 21, 8, 0, 0),
    })

    //no services
    const availability = await listProviderMonthAvaibility.execute({
      provider_id: "user",
      year: 2020,
      month: 5,
    })

    expect(availability).toEqual(expect.arrayContaining([
      { day: 19, availabla: true },
      { day: 20, availabla: false },
      { day: 21, availabla: true },
      { day: 22, availabla: true },
      ]),
    );
  });
});
