// اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ لَا تَأْخُذُهُ سِنَةٌ وَ
// لَا نَوْمٌ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا
//  بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ وَسِعَ
//  كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ وَلَا يَئُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيمُ

import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { UtilsService } from '@/common/utils/utils.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly utilsService: UtilsService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger,
  ) {}

  @Get('generate')
  generateUniqueString(): any {
    const unique = [];
    for (let i = 0; i < 100000; i++) {
      unique.push(this.utilsService.generateString(6));
    }

    unique.push('12DI92');
    unique.push('12DI92');
    return {
      length: unique.length,
      duplicates: this.utilsService.findDuplicates(unique),
      unique,
    };
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
