import { slugify } from '@/shared/utils/slugify';
import type { toc } from '../types/toc';

export const parse_header_content = (line: string) => {
  let level: number = 0;
  let diez_end_index: number | undefined;
  let bracket_start_index: number | undefined;
  let bracket_end_index: number | undefined;
  let parenthesis_start_index: number | undefined;
  let parenthesis_end_index: number | undefined;
  for (let i = 0; i < line.length; i++) {
    const letter = line[i];
    if (letter === '#') {
      level++;
      continue;
    }
    if (!diez_end_index) diez_end_index = i + 1;
    if (letter === '[' && !bracket_start_index) bracket_start_index = i + 1;
    else if (letter === ']' && bracket_start_index && !bracket_end_index) bracket_end_index = i;
    else if (letter === ']' && bracket_start_index && bracket_end_index && bracket_end_index < i) bracket_end_index = i;
    else if (letter === '(' && !parenthesis_start_index && bracket_end_index) {
      if (bracket_end_index + 1 === i) parenthesis_start_index = i + 1;
      else break;
    } else if (letter === ')' && !parenthesis_end_index && parenthesis_start_index) parenthesis_end_index = i;
  }
  if (bracket_start_index && bracket_end_index && parenthesis_start_index && parenthesis_end_index) {
    const title = line.slice(bracket_start_index, bracket_end_index);
    const id = line.slice(parenthesis_start_index, parenthesis_end_index);
    return { level, title, id, user_slugged: true };
  } else if (diez_end_index) {
    const title = line.slice(diez_end_index);
    const id = `#${slugify(title)}`;
    return { level, title, id, user_slugged: false };
  }
};

//TODO : handle multiple links in a header
export const extract_toc = (input: string) => {
  const lines = input.split('\n');
  const toc: toc = [];
  lines_loop: for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    let start_index = 0;
    while (line.length > start_index && line[start_index] !== '#') {
      if (line[start_index] === '`') continue lines_loop;
      start_index += 1;
    }
    if (
      line.startsWith('# ', start_index) ||
      line.startsWith('## ', start_index) ||
      line.startsWith('### ', start_index) ||
      line.startsWith('#### ', start_index) ||
      line.startsWith('##### ', start_index) ||
      line.startsWith('###### ', start_index)
    ) {
      const data = parse_header_content(line.slice(start_index));
      if (data) {
        const { user_slugged, ...toc_item } = data;
        toc.push(toc_item);
        if (!user_slugged) {
          lines[i] = `${'#'.repeat(toc_item.level)} [${toc_item.title}](${toc_item.id})`;
        }
      }
    }
  }
  return { toc, markdown: lines.join('\n') };
};
/*
console.log(
  extract_toc(`
# Hey
## HUHH

### [Bruhh](#hey)

#### [Bruhh [Neww]](#hey)

> #### [Bruhh [Neww]](#hey)
- # [AAAA](#hey)
  - AH
    - ## BBB
> # Fuck
  `)
);
*/
