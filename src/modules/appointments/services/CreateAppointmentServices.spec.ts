// test() = it()
// teste unitario, cria o fake repository - n utiliza o BD 'real'
import AppError from '@shared/errors/AppErrors';
import CreateAppointmentServices from './CreateAppointmentServices';
import FakeAppointsRepository from '../repositories/fakes/fakeAppointmentsRepository';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointsRepository = new FakeAppointsRepository();

    // Criou o service e passou o repository fake, salva as infos na memoria da aplicação
    const createAppointment = new CreateAppointmentServices(
      fakeAppointsRepository,
    );

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '123123',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123');
  });

  it('should not be able to create two appointments on the same time/hour', async () => {
    const fakeAppointsRepository = new FakeAppointsRepository();

    // Criou o service e passou o repository fake, salva as infos na memoria da aplicação
    const createAppointment = new CreateAppointmentServices(
      fakeAppointsRepository,
    );

    const appointmentDate = new Date(2020, 4, 10, 11); // mes 05 (começa no zero), dia 10, as 11horas

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '123123',
    });

    expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
