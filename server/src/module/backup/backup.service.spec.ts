import { BackupService } from './backup.service';

describe('BackupService', () => {
  let service: BackupService;
  const logSpy = jest.spyOn(console, 'log').mockImplementation(() => undefined);

  beforeEach(() => {
    service = new BackupService();
  });

  afterAll(() => {
    logSpy.mockRestore();
  });

  it('should log when performing backup', async () => {
    await service.performBackup('nightly');
    expect(logSpy).toHaveBeenCalledWith('performBackup', 'nightly');
  });
});
