import { PartialType } from '@nestjs/swagger';
import { SearchQueryDto } from '@/common/base/dto/search-query.dto';

export class SearchProviderDto extends PartialType(SearchQueryDto) {}
