import { inject, Injectable } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Content, TDocumentDefinitions } from 'pdfmake/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ResumeService {
  translocoService = inject(TranslocoService);

  generatePdf(): void {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    const documentDefinition: TDocumentDefinitions = {
      content: [
        {
          text: `${this.translocoService.translate('resume.title')}`,
          style: {
            fontSize: 20,
            bold: true,
            alignment: 'center',
          },
        },
        {
          text: `${this.translocoService.translate('resume.subtitle')}`,
          style: {
            fontSize: 14,
            alignment: 'center',
          },
        },
        {
          text: '\n',
        },
        {
          text: `${this.translocoService.translate(
            'resume.sections.about.short_intro'
          )}`,
        },
        this.buildResumeKeyVal({
          key: this.translocoService.translate(
            'resume.sections.about.buzzwords.key'
          ),
          value: this.translocoService.translate(
            'resume.sections.about.buzzwords.value'
          ),
        }),
        this.buildResumeKeyVal({
          key: this.translocoService.translate(
            'resume.sections.about.languages.key'
          ),
          value: this.translocoService.translate(
            'resume.sections.about.languages.value'
          ),
        }),
        this.buildResumeSeparator(),
        this.buildResumeSection({
          label: this.translocoService.translate(
            'resume.sections.experience.label'
          ),
          content: [
            {
              title: this.translocoService.translate(
                'resume.sections.experience.allround.title'
              ),
              location: this.translocoService.translate(
                'resume.sections.experience.allround.location'
              ),
              date: this.translocoService.translate(
                'resume.sections.experience.allround.date'
              ),
              lines: this.translocoService.translate(
                'resume.sections.experience.allround.lines'
              ),
            },
            {
              title: this.translocoService.translate(
                'resume.sections.experience.codecrowd.title'
              ),
              location: this.translocoService.translate(
                'resume.sections.experience.codecrowd.location'
              ),
              date: this.translocoService.translate(
                'resume.sections.experience.codecrowd.date'
              ),
              lines: this.translocoService.translate(
                'resume.sections.experience.codecrowd.lines'
              ),
            },
          ],
        }),
        // volunteering
        this.buildResumeSeparator(),
        this.buildResumeSection({
          label: this.translocoService.translate(
            'resume.sections.volunteering.label'
          ),
          content: [
            {
              title: this.translocoService.translate(
                'resume.sections.volunteering.itsupport.title'
              ),
              location: this.translocoService.translate(
                'resume.sections.volunteering.itsupport.location'
              ),
              date: this.translocoService.translate(
                'resume.sections.volunteering.itsupport.date'
              ),
              lines: this.translocoService.translate(
                'resume.sections.volunteering.itsupport.lines'
              ),
            },
          ],
        }),
        // education
        this.buildResumeSeparator(),
        this.buildResumeSection({
          label: this.translocoService.translate(
            'resume.sections.education.label'
          ),
          content: [
            {
              title: this.translocoService.translate(
                'resume.sections.education.university.title'
              ),
              location: this.translocoService.translate(
                'resume.sections.education.university.location'
              ),
              date: this.translocoService.translate(
                'resume.sections.education.university.date'
              ),
              lines: this.translocoService.translate(
                'resume.sections.education.university.lines'
              ),
            },
            {
              title: this.translocoService.translate(
                'resume.sections.education.highschool.title'
              ),
              location: this.translocoService.translate(
                'resume.sections.education.highschool.location'
              ),
              date: this.translocoService.translate(
                'resume.sections.education.highschool.date'
              ),
              lines: this.translocoService.translate(
                'resume.sections.education.highschool.lines'
              ),
            },
          ],
        }),
        // { text: `Dynamic data: ${data.dynamicContent}`, style: 'content' },
      ],
      pageSize: 'A4',
      pageOrientation: 'portrait',
      pageMargins: [40, 20, 40, 20],
      defaultStyle: {
        fontSize: 11,
      },
    };

    pdfMake.createPdf(documentDefinition).open();
  }

  buildResumeSeparator(): Content {
    return {
      canvas: [
        {
          type: 'line',
          x1: 0,
          y1: 5,
          x2: 515,
          y2: 5,
          lineWidth: 0.5,
        },
      ],
      marginBottom: 2,
      marginTop: 2,
    };
  }

  buildResumeKeyVal(data: { key: string; value: string }): Content {
    return [
      {
        text: [
          { text: `${data.key}: `, bold: true },
          { text: `${data.value}` },
        ],
      },
    ];
  }

  buildResumeSection(data: ResumeSection): Content {
    const content = {
      stack: [...data.content.map((item) => this.buildResumeCard(item))],
    };

    if (data.label) {
      content.stack.unshift({
        text: `${data.label} `,
        fontSize: 12,
        // margin: [0, 4, 0, 2],
        bold: true,
      });
    }

    return content;
  }

  buildResumeCard(data: ResumeEntry): Content {
    return <any>{
      stack: [
        {
          columns: [
            {
              text: [
                {
                  text: `${data.title} `,
                  bold: true,
                },
                {
                  text: '\u00A0',
                },
                {
                  text: `${data.location} `,
                },
              ],
              width: '*',
            },
            {
              text: `${data.date} `,
              alignment: 'right',
              width: 'auto',
              fontSize: 8,
            },
          ],
          marginBottom: 8,
          marginTop: 8,
        },
        {
          ul: data.lines,
        },
      ],
    };
  }
}

export interface ResumeModel {
  title: string;
  subtitle: string;
  sections: {
    intro: ResumeSection;
    experience: ResumeSection;
    volunteering: ResumeSection;
    education: ResumeSection;
  };
}

export interface ResumeSection {
  content: ResumeEntry[];
  label?: string;
}

export interface ResumeEntry {
  title?: string;
  date?: string;
  lines?: string[];
  dictionaries?: { key: string; value: string }[];
  plainText?: string;
  location?: string;
}
