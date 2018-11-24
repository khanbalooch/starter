import { DashboardModule } from './dashboard.module';

describe('DashboardModule', () => {
  let dashModule: DashboardModule;

  beforeEach(() => {
    dashModule = new DashboardModule();
  });

  it('should create an instance', () => {
    expect(dashModule).toBeTruthy();
  });
});
