import { inject, Injectable } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import pdfMake from 'pdfmake/build/pdfmake';
import { Content, TDocumentDefinitions } from 'pdfmake/interfaces';

export interface ResumeEntry {
  date?: string;
  dictionaries?: { key: string; value: string }[];
  lines?: string[];
  location?: string;
  plainText?: string;
  title?: string;
}

export interface ResumeModel {
  sections: {
    intro: ResumeSection;
    experience: ResumeSection;
    volunteering: ResumeSection;
    education: ResumeSection;
  };
  subtitle: string;
  title: string;
}

export interface ResumeSection {
  content: ResumeEntry[];
  label?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ResumeService {
  translocoService = inject(TranslocoService);

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

  buildResumeHeader(): Content {
    // static data, a row of 3 texts
    // website, location, and email
    return [
      {
        columns: [
          {
            text: '📍',
            style: {
              font: 'NotoEmoji',
            },
            width: 16,
          },
          {
            text: `${this.translocoService.translate(
              'labels.resume.location'
            )}`,
          },
        ],
      },
      {
        columns: [
          {
            text: '🔗',
            style: {
              font: 'NotoEmoji',
            },
            width: 16,
          },
          {
            text: 'hidragos.dev',
            link: 'https://hidragos.dev',
          },
        ],
      },
      {
        columns: [
          {
            text: '✉️',
            style: {
              font: 'NotoEmoji',
            },
            width: 16,
          },
          {
            text: 'dragos.andrei.iliescu@gmail.com',
            link: 'mailto:dragos.andrei.iliescu@gmail.com',
          },
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
      marginBottom: 4,
      marginTop: 2,
    };
  }

  generatePdf(): void {
    pdfMake.fonts = {
      Merriweather: {
        normal: `${window.location.origin}/assets/fonts/Merriweather-Regular.ttf`,
        bold: `${window.location.origin}/assets/fonts/Merriweather-Bold.ttf`,
      },
      NotoEmoji: {
        normal: `${window.location.origin}/assets/fonts/NotoEmoji-Regular.ttf`,
      },
    };

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
        this.buildResumeHeader(),
        {
          text: '\n',
        },
        {
          text: `${this.translocoService.translate(
            'resume.sections.about.short_intro'
          )}`,
        },
        {
          text: '\n',
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
        // this.buildResumeSeparator(),
        // this.buildResumeSection({
        //   label: this.translocoService.translate(
        //     'resume.sections.volunteering.label'
        //   ),
        //   content: [
        //     {
        //       title: this.translocoService.translate(
        //         'resume.sections.volunteering.itsupport.title'
        //       ),
        //       location: this.translocoService.translate(
        //         'resume.sections.volunteering.itsupport.location'
        //       ),
        //       date: this.translocoService.translate(
        //         'resume.sections.volunteering.itsupport.date'
        //       ),
        //       lines: this.translocoService.translate(
        //         'resume.sections.volunteering.itsupport.lines'
        //       ),
        //     },
        //   ],
        // }),
        // education
        // this.buildResumeSeparator(),
        // this.buildResumeSection({
        //   label: this.translocoService.translate(
        //     'resume.sections.education.label'
        //   ),
        //   content: [
        //     {
        //       title: this.translocoService.translate(
        //         'resume.sections.education.university.title'
        //       ),
        //       location: this.translocoService.translate(
        //         'resume.sections.education.university.location'
        //       ),
        //       date: this.translocoService.translate(
        //         'resume.sections.education.university.date'
        //       ),
        //       lines: this.translocoService.translate(
        //         'resume.sections.education.university.lines'
        //       ),
        //     },
        //   ],
        // }),
        // { text: `Dynamic data: ${data.dynamicContent}`, style: 'content' },
      ],
      pageSize: 'A4',
      pageOrientation: 'portrait',
      pageMargins: [40, 20, 40, 20],
      defaultStyle: {
        fontSize: 10,
        // lineHeight: 1.5,
        lineHeight: 1.2,
        font: 'Merriweather',
      },
    };

    pdfMake.createPdf(documentDefinition).open();
  }
}
