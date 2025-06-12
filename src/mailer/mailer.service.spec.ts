import { MailerService } from './mailer.service';
import * as nodemailer from 'nodemailer';

jest.mock('nodemailer');

describe('MailerService', () => {
  let service: MailerService;

  const mockSendMail = jest.fn();
  const mockVerify = jest.fn();

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();

    // Mock nodemailer.createTransport to return an object with sendMail and verify
    (nodemailer.createTransport as jest.Mock).mockReturnValue({
      sendMail: mockSendMail,
      verify: mockVerify,
    });

    service = new MailerService(); // Will use the mocked nodemailer
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should send email with correct parameters', async () => {
    const to = 'test@example.com';
    const subject = 'Test Subject';
    const html = '<p>Hello</p>';
    const attachments = [{ filename: 'test.txt', path: './test.txt' }];

    mockSendMail.mockResolvedValueOnce({ messageId: '123' });

    const result = await service.sendMailWithAttachments(
      to,
      subject,
      html,
      attachments,
    );

    expect(mockSendMail).toHaveBeenCalledWith({
      from: 'mahanandhanait@gmail.com',
      to,
      subject,
      html,
      attachments,
    });

    expect(result).toEqual({ message: ' Email sent sucessfully' });
  });

  it('should throw error when sending fails', async () => {
    mockSendMail.mockRejectedValueOnce(new Error('SMTP error'));

    await expect(
      service.sendMailWithAttachments('fail@test.com', 'Fail', '<p></p>', []),
    ).rejects.toThrow('Failed to send email');
  });
});
