// test() = it()
// teste unitario, cria o fake repository - n utiliza o BD 'real'
import CreateAppointmentServices from './CreateAppointmentServices';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', () => {
    expect(1 + 2).toBe(3);
  });

  it('should not be able to create two appointments on the same time/hour', () => {
    expect(1 + 2).toBe(4);
  });
});
