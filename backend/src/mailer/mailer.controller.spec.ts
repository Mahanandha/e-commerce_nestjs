import { Test, TestingModule } from '@nestjs/testing';
import { MailerController } from './mailer.controller';
import { MailerService } from './mailer.service';
import { SendMailDto } from './dto/send-mail.dto';

describe('MailerController', () => {
  let controller: MailerController;
  let service: MailerService;

  const mockMailerService = {
    sendMailWithAttachments: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MailerController],
      providers: [
        {
          provide: MailerService,
          useValue: mockMailerService,
        },
      ],
    }).compile();

    controller = module.get<MailerController>(MailerController);
    service = module.get<MailerService>(MailerService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('sendEmail', () => {
    it('should call mailerService.sendMailWithAttachments with correct values', async () => {
      const dto: SendMailDto = {
        to: 'test@example.com',
        subject: 'Test Subject',
        html: '<b>Test HTML</b>',
        attachments: [{ filename: 'test.txt', path: './test.txt' }],
      };

      mockMailerService.sendMailWithAttachments.mockResolvedValueOnce({
        success: true,
      });

      const result = await controller.sendEmail(dto);

      expect(service.sendMailWithAttachments).toHaveBeenCalledWith(
        dto.to,
        dto.subject,
        dto.html,
        dto.attachments,
      );
      expect(result).toEqual({ success: true });
    });
  });
});
