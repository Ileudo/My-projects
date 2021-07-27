import './registration.scss';
import { BaseComponent } from '../../common/base-components';
import { Config } from '../../utils/interfaces';
import imageValidityIcon from '../../assets/images/register/validityIcon.svg';
import imageAvatarTemplate from '../../assets/images/register/avatar-template.svg';

export class Registration extends BaseComponent {
  isFirstNameValid: boolean;

  isLastNameValid: boolean;

  isEmailValid: boolean;

  form: HTMLFormElement;

  firstNameInput: HTMLInputElement;

  lastNameInput: HTMLInputElement;

  emailInput: HTMLInputElement;

  avatar: HTMLImageElement;

  srcAvatarBase64?: string;

  validityIcon!: HTMLElement;

  submitButton: HTMLElement;

  cancelButton: HTMLElement;

  data: { firstName: string; lastName: string; email: string; avatar: string };

  constructor(config: Config) {
    super(config);
    this.element.innerHTML = `
    <div class="registration__content">
    <h2 class="registration__title">Register new Player</h2>
    <form action="" class="registration__form">
      <div class="registration__form-inputs">
        <div class="registration__form-input">
          <div class="registration__input-wrapper registration__first-name">
            <label for="first-name" class="registration__label registration__first-name-label">First Name</label>
            <input required autocomplete="off" maxlength="30" type="text"
            id="first-name" class="registration__input registration__first-name-input">
          </div>
          <div class="registration__checkbox-wrapper">
            <div class="registration__checkbox">
              <img src="" alt="correctly filled field">
            </div>
          </div>
        </div>
        <div class="registration__form-input">
          <div class="registration__input-wrapper registration__last-name">
            <label for="last-name" class="registration__label registration__last-name-label">Last Name</label>
            <input required autocomplete="off" type="text" maxlength="30"
            id="last-name" class="registration__input registration__last-name-input">
          </div>
          <div class="registration__checkbox-wrapper">
            <div class="registration__checkbox">
              <img src="" alt="correctly filled field">
            </div>
          </div>
        </div>
        <div class="registration__form-input">
          <div class="registration__input-wrapper registration__email">
            <label for="email" class="registration__label registration__email-label">Email</label>
            <input required autocomplete="off" type="email"
            id="email" class="registration__input registration__email-input">
          </div>
          <div class="registration__checkbox-wrapper">
            <div class="registration__checkbox">
              <img src="" alt="correctly filled field">
            </div>
          </div>
        </div>
      </div>
      <label class="registration__avatar-label">
        <input class="registration__avatar-input" type="file">
        <img src="" alt="avatar" id="avatar">
      </label>
      <div class="registration__buttons">
        <button type="submit" class="disabled btn registration__btn registration__btn--add-user">Add User</button>
        <button type="button" class="btn registration__btn registration__btn--cancel">Cancel</button>
      </div>
    </form>
  </div>`;

    this.data = {
      firstName: '',
      lastName: '',
      email: '',
      avatar:
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTk4IiBoZWlnaHQ9IjE5OCIgdmlld0JveD0iMCAwIDE5OCAxOTgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgo8cGF0aCBkPSJNMTk4IDk5QzE5OCAxNTMuNjc2IDE1My42NzYgMTk4IDk5IDE5OEM0NC4zMjM4IDE5OCAwIDE1My42NzYgMCA5OUMwIDQ0LjMyMzggNDQuMzIzOCAwIDk5IDBDMTUzLjY3NiAwIDE5OCA0NC4zMjM4IDE5OCA5OVoiIGZpbGw9InVybCgjcGF0dGVybjApIi8+CjxkZWZzPgo8cGF0dGVybiBpZD0icGF0dGVybjAiIHBhdHRlcm5Db250ZW50VW5pdHM9Im9iamVjdEJvdW5kaW5nQm94IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIj4KPHVzZSB4bGluazpocmVmPSIjaW1hZ2UwIiB0cmFuc2Zvcm09InNjYWxlKDAuMDA1MjA4MzMpIi8+CjwvcGF0dGVybj4KPGltYWdlIGlkPSJpbWFnZTAiIHdpZHRoPSIxOTIiIGhlaWdodD0iMTkyIiB4bGluazpocmVmPSJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQU1BQUFBREFDQVlBQUFCUzNHd0hBQUFSL0VsRVFWUjRBZTFkQ2F4Y1pSVitsVVZFUlZBVFl5SWlWa0NDeUtxNG9YR0xiU0Z1K0F3Z0FpWk5DNFlYM3BzNTM3blRBdVZHUXlKUU5pbExRVkUyQlFzVXhDTEdLQUkxcFdsVkNyYUJobGFOQVF1MHRHV3h5K3RpRHY1VDVzMmI5MmJtenIzL2RzOUxYdWJPM0h2LzVUdmYrZGZ6bjlQWHAzK0tnQ0tnQ0NnQ2lvQWlvQWdvQW9xQUlxQUlLQUtLZ0NLZ0NDZ0Npb0Fpb0Fnb0FvcUFJcUFJS0FLS2dDS2dDQ2dDaW9BaW9BZ29Bb3FBSXFBSUtBS0tnQ0tnQ0NnQ2lvQWlvQWdvQW9xQUlxQUlsQmlCb2FHaHR4RFJSd0NjQ0dBQXdHd0F0eFBSZ3dDV0FGZ040QVVBR3dGc0FyRGQvTXUxL0NiMzVKa2w1cDNiSkExbVBrZlNUSkxrTU1tanhCQnIxWDFCWUdobzZKMUVkQUtBV1FEdUFyRFNrSGtuZ0NML3R6UHowMFEweitROXBWYXI3ZWNMTGxxT1NCR1lNV1BHdXdDY0F1QkdBQ3NBN0NpWTZOMG9rWlJsT1RQZlFFUW5pM0pHS2dhdGxrMEVraVE1bklndUJQQ1lwZGE5RzlLUDkrdzJBSXVJNkFJWk50bkVUUE1LSEFGbVBvU1pVOVBLajBleWtPNHRsK0ZTcFZJNU9IRHhhUEdMUUVBbWxzeDhCb0NGSGcxcmlsS3dSNWo1dXpxWkxvSkpnYVZacTlVK0FPQktBQnRLUVB4bWhWb1A0UEpxdFhwQVlHTFQ0dmFLUUxWYS9SaUFYd0dRc1hJek1jcjJmWmlaZjFtdFZvL3BGVmQ5MzNNRW1QbFlabjVBU1QrbTB0OWZxVlNPOGx5TVdyeHVFWkNWRUFEM0t2SEhKSDVqcjdlRGlPNnVWcXNmN2habmZkNHpCR1R0bm9pdTBhRk9SOFJ2VkFLNWxxSFJWYnJKNWhtcE95bE9tcVp2TXVZREwybXJuNG44amNxd2xwblA2dXZybTlBSjl2cU1Zd1RNY0dlUkVyOW40amNxZ1Z3dlpPWkRIWXRYc3g4TGdXblRwdTFoTnJDMktQbHpKMzlkR2JiSTduS2FwcnVQSlFmOTNRRUNzc05wckMzcmd0TFBZcGQzeFRSa29nTlJhNWJOQ0FDWUN1QlZiZlVMYS9WYk5pWkU5QXFBTTV2bG9kOHRJU0JiK1FCdVZlTGJKWDR6M2tSMFU1cW1lMWtTdTJZakNOUnF0UThTMGVQTnd0RHZ6cFJocVpwVVdOSk5adjQ4QUYzZUxIYU0zM0xZMDZhQldRdmdlRXMwS0djMllzVUlRRmQ1L0NOL1hXRTJ5NkdoY3JLejRGcWI0Mzkxb1BYVFh5WFl3Y3d6Q3FaRHFaS2ZZRXlXbGZUK2tyNlZiR2FYaXFWRlZGWk1Hc3daM0ZZQTYyLytLOFIxYWtLUlVUTU0rWFdaMDMrU2o5c1FFZEhQVlFtNlZ3SVo5b2ozaFhIQkRlaitHamwwQXVEY0pFbStJcnVvNHJraFRkTTk1Vit1NVRkejcxd0Fkd0I0UHFENnRaUFQ5ZDFUb01SdmlCbHVCTUpmUjBSWHkrbXpyS0prNW84RG1BTmdYZWg0TVBObFdYRW8xWHNSclBZOFMwU0RhWnJ1blpmZ2lPaXRSRlJoNXVkQ1ZnUmRIV3JEQ0FDbkJ5emdyUUF1RnJLMnFXYm0yMm1hdnMyNFd4d09GQ2R4NEtYN0JLMFlZSFo0aFVUdHhwTSszaGUzaUVlMnFsY1J2d0U0R3NBemdXSWxtMlc2WTl4SURMSHRDZGk4WVQ0enY3MnhQamF1QndZRzlnSHc2MENWWUszYURobVdpRlZud0ladGMyVzUxZ2JoVytYUjM5Ky9HelAvSkZBbFdLcFdwSDE5ZlFHYk5NOXRSVW9YdndXc0JEOTFnWmMzZVpyRExENk82ZHVWYWI2MHZyNEFLV1VKZFRna0xpbDl3ZEZxT1FBY0ZPaEpycFV1eHZ6dGhHUG1CQ0ZPakYrV09XQzcra1YxWHc2d0IzcUdWMWFwckszMmRDdDBjVzhvL253Q25CTXNLdFZCZStPOW9kMHd3OGY3RjNkTFN0dlBpOFBiQUJWQVpIMitiYXljNUdkaWFJVzQzaTg3dklWdGN1VWxEQm1lQVZnVG9CSnNqdDRkbzdId0ROVnAxVkJlSkMwNkhXWkdnQXF3azRnZWpkcHkxTGdyOUhGbzA2NU02L0swN1NsYUFZekpSSkRucG9sb2V0SDRPRW5mQkprTFZTaFhPd0d0aDB3QlhCZGlMd0RneGNIQndYMTdxTHFmcnhxejNuWXRyWmYzZXpGcGRpVU5adjVFb0Fxd2s1bXZjSVZiSWZrYWg3V2hSbU5aVXdnb3hTY3FoNG9rOExhWGpVcWJjbTJWWUlYRlEyUXBoNUNEVThoSkxrc3c1WjZOQ1FNVm9nTEloSGhlN29DNFNGRENFclhSZHQ4RmRLNEwzUExJRThCUXdOanZTSkxraUR4d2NKcEc2REc1NUp5dVV3Qjd5QnpBbElBVlFCckcrM3FvdnZ0WFRUUkczMXY0ZHVVTDFnMjRzYmRxVnordjd3Y2R0SStaN3d5OEJkb3BIaHZjTnlYWlNsQ3RWdDhkT3Y0QWJzOVdlOGR2bVNEVW9hNzg3R29WeFcySll5Z3paejh3TVBEbUNCUmd1RktwN0o4WkJGY3Z4dUxPVUJYQS9USnFjQzVWeEd3QXdJWUlXaDhkQXZteGovQlNVTWNuNVpSUERPUTNkZEJKc0FkS1FFU251UnJOZEoydmhOU01SUUYwR2RUOUVFaTR4TXdQZDAxRUZ5K0lUWGNzNURmMTBJMHdEM29Ba1VXdFZ2dVFDMDUzbFdmQXA3MTJyZncwS3JDYVF2alJBeGlaK0g5cURNQ0tSZ0pGY0szR2NKNzBBQUNlNktvMXR2MXdraVNIUjBENFVUMkJta1A3MHdzdzg2RzJlZDF4ZmtSMFlZd0tJRzdPT3diQmt3Y0JYQnVwTE03ekJPTFJ4UUR3V0l5Z0ExaXJSeUs5NlFVV2ptYWVCNytZSTQvYkkxVUFHUmJwb1hnLzVnTGJ2RHd5S1g3Zkl5YS9yRU0vcDI1UnZPa0YrajFvODBjV0liS1lYcU1td2thNTFUR1dINzNBdFNQWjU4RzNDSmMvV3ltQnVrYjBRd0g4V2c0MVVRNGwvRTByMHNUMm01Zk9jWk1rZVFlQVZTV1J3WGFwcndmdC92K0xRRVFubEFUNHVqTFBkeGtZbzFud0lidEg3NEUzazVweGNQWTlnc2lPZFdKMzg2a0JNaHoyK0VUa3ozNEFnTHQ2ME9SdVNPZmJzM05kQnNxUXZBT09EdE9yTE85dzF1STNad3hBb2lUMldxRlEzOWNnZVc1a3Y2S1poMDYrUzVBN0FERnZnSFdpbUN0dGVpOHdnVEJDakFiVENaYWRQck5Oemp3N0lYMWpwc2JmZjZlRmp2azVpY3h5cVhobWJzUW56MnZqKzE4Q1lJUVlCU1ozMlhzUlR3REFpU1VlL293U3F1d1lNM00xejExalVTcmo4ei9Fd0Jlak1NcUxMOVZxZFhLZURVeW10QUFNNUZXaHlOSlpSMFRYRU5GeEdZTStUREFlbnNXcU0waTM4aGJrZVhZbTB1YjVFb0RaRmlwYVdDdGlxZXpQaTVNd0locVVWa3VPOW9uVEtobkR5cjljbTk4bXl6UEdxVzJvbnAydHlZcUlMc21UeTVuU0VzOWRsa2hrRFZpdFR4Z3Jla1IwU3liUzV2a1NFVDJvaEFtRE1MSEpTUnd2NThubFRHa0ZHdTlYZXhNM2EvZDU0NzQ0RTJuemZBbkE2dGhhRnExUE1EM2Fxank1bkNtdGdNUHc1TjBhYVhyMmV4WDNIanNBYk5RV001Z1dNellsWForcDFjN3pKUUNiVkFGVUFSeHg0TFU4dVp3cExiVURVdkk3SXIvMFp0c3lrVGJQbDFRQlZBSEtyZ0E2QkxJLytZdHRMSisxUGw0TWdYUVNyQXFRbGNDOXZ1ZkZKRmh0VmxRQmVpVnkxdmU5V0FiVmpUQlZnS3dFN3ZVOUx6YkNsamljQlBVS29MNGZ0dks2TjRWUVl6aGRCWExZQUM3SWMwVXpVMW9BYm5NSWdNOHQrQllBVHdGWUlBZGp4SFVNRVUwbm9tOFEwWmVTSlBrTU14OHIvM0l0djVsNzA4Mno4czRDazRhazVYTmRuWlROQzNOb1BSRHpPakZYRWRFOElycUFtYjhxUWNMemRKd2xhUkhSZ1VUME5jbkR1S0g1UjltVndvc0RNY3g4VHNrRUlSNHdGc3NCZUdteFo4NmMrWjVNWFdjT0x3ME9EcjRYd0VrU1NCckEwaEp1U25weEpMSU1oK0tmRlFkVVJQUnQ4WU9hQTNjTFNVS09WaExSeVVSMEU0QXlIS0IzN3g0eFNaTERJdTBCL2dYZzhpUkpQcFh4VUhzaEpPODBVUmsyQVRpZW1hOEM4TzhZWmNUTWgzU0tSMkhQUmVZWTYxWFRlbjY2TU1EY0pEeWhXcTErRnNETkFGNkxSQm1HdlhDTUpmSms1cWREQnBXSUhnY3dWUnhQdWVHbnZWd0hCZ2Iya2RVb0FIOFBXV1lBbHR0RHJVMU9zZ0lTS0ppL1krWXZ0NmxlckxlbFY1Z000SStCeXM0cjU3aXpBZ1B4dHdDT2pKWFozZFpMNGlBRCtFTmdNcHpaYlQwTGV4N0FsRURBVzBwRVh5Z01pTUFUQmpBSndMSkFaT2wrQmFndTcxcXR0aDhBYjBNa0VkRXJ6UHo5RUZkejZoamIralNyUjBNQS91dXhJbXlYdVl3dFREcktSeVlsbmdMMmU5bVo3YWdTK3RBdUJNUlZJNEJIUEpYcHNsMEY5ZVdDbVcvd0RDenBrZndaSi9vaXFPN0tNUUhBRHoyVDYwNnhyZXF1R2hhZWxoMUlYNEF5UTU2dlc2aDJLYkl3c3ZWbVNNVE0zL0lPZUJNcTFZZElNUnNBSE8wZFFJRVhTRnkxUzhQaVFTTTM3RldJMUVhNUFsamtHQ0RaNVl4dEY3Y1JZcWZYc29JR1lMTkxHUlBSbzA1QkdDOXpZNnJyeERiY1dFSk9HYTk4ZXE5M0JKajVteTRWd090NW5jdDRZV0wwMWJ0NE5ZVk9FQUJ3b3lzbDhDSXUySGdnT1ZvT1haMW5USzd4NnFmMyt2cGtEZDZSaGFsL3k1L05oSEFSTlY1V0tackxvZCtMUlFEQW1RNTZBZitYdFN1VnlzR1dnVm1icHVtZXhZcGJVMjlHSUUzVHZRSElpcHZOT2QvRTVuSjQrVjFtNnJhQVllWXJ2QVNoQklVeWgvMXRLY0JEd1VBSzRIU0xDcUFiWG82WUFhRGZscHlKNkZSSDFldytXM05LYkwwTmNKSWtPYno3RXVvYmVTQlFxVlNPc2lGakFPdThPZjNWS1hCeW50WUdPTjVaQlhZS1VBVFB5WTZzRFJtTDY1M2c0S3BXcXdkSUFBTUxBUG0vTWhDYzlEb3JNQkdkWjBHK1c1bjVmWjJWeUxPbkFOeGhBeUE1MGVSWjFhTXZEaEVkQjJEWWdueHZEUmJNYXJWNmpBV0FaQlZpWlJrT3RQdENCTUVhd0RNMlpKc2t5UkcrMUR0VE9aajVOemFBQW5DUG52aktKS0p1WDVJekF2ZFprdW44Ymd2bjNmTm1wY0RXY2NsWjNnRVFXWUdZK1FlV3lMOGptaFUrSXJyYkZtaGlyUmdaNTd5cGpyaUd0SGoyMngrM0o3MUtRQ3o0TEUyWVpENGc5dXFmNjdYTSt2NUlCSmo1aXdCc3VXbmZDdUNna1NVSS9KdnhVV2xyMjN4RDhKTW5qK1F0Sit3QXZHeXBGeGVPaExmdTMwNWV4blhLV29zZ3ZrQkVIMjFYTHIwL1BnSm1EbWRWYnQ0ZWVSd2ZxdlozbWZrc2l3b2dMY2xhRVdEN2t1a1RyUkF3SHVOZXNpeXpxYTNLRXN0dkU0am96NVlCWFM4aGlHSUIwRlk5WkI3bHdOejVUOUV2WlRQem9SWW5VL1U1eDJZOU5OTzU2aERSYVE1a3RFbk9rblJleW9DZmRIUjRmb2ZZcmdRTW00MmlTdzk5b2VVZXV0NUlsY2VtSzAzVDNRRTg1Z2pvZTZPZFpQV2dJckpJWVhIWHZrNzYrdWZDL3Y3KzNYb29mbml2QXBqbzBOSFNLbldlOVFabnpHVFhWZFRKamFYMTNlcm9ZSFc5MVpITmxsblNHNzFCaFhKZFRaczJiUTlqMm1ERHFyT08rNGhQWnY1T3VWQnZxaTJBbnprYUN0VUZzVFFhbTVNbWJNZjdLZ0ZDQVB6Tk1mWnp4eXRqS2U2bGFib1hnTDg0RnNTdzdGU1hZVzVnTmlUbldEcXNWRzlrV24wdVZtOGVSc1hONlRHYnU0MnRCQ0sveWU3eGRCa2F4TmI2U0owQW5BM2dSY2VOemVzNEIzdktxeWhpU0V4YjE0NVhHNGl4bXBtL0Y4UEtoRmx4bXdyZ253MzFHNnNCc1BIN0ppTDZaRkU4Q2pwZEFLZFlOTGZ0Uk5pcmlHZ3d4SVAzTXB3am9nb0FWNnM3cmZDVmN5SDlRWk8wNk1LTDkxOVBXcXBHQVlvbDVJOURpQ3hwTERmbk9GeGlic1J0eERVem8yaitSSkcrbU1ONnFBUjFZVDdKekFrUkhlZ0wyTEtuQXFEbXlERnhIWmR4UDRub1I3N2dGVVE1QUZ6dnNSTFVoYjBDd0tVU09FSjhaZG9DVmp4aG13TXEwbEE4RlFCT2MyeGhFMDArSmx6bnpRRUl0NjRNc3Bra2NZaXZsZ20waEJUS1krNGdZM2xKUzlJRU1JZVovK3JCRW1hOXptMC9pZWltNkMwOEM5UTY4VUFRUWs4d0poR1krVGtBU3dEY2J5SnBYaVRHZ0RJZVp1Wnp6RCtNZ2VCRjVwbjd6VHYvQ2FnQkdJV0JpZVk0b1VCK2xDTnBacjRzWkNLVXNldzY1czlaTjgzcWtDMzNLcU5hc3pLU09HT2RkK2hxVDg3a3J5ZG45Z21jUmluTVNJcXlLTlFtWGVldnM3V2dUN05qN0lQWlJGbEkzV2s5eFl4RWQzZ0w0djJJWkkzdGtHc0R1azZKVVlibkZsY3FsZjFIQ0VtL0ZJdUFXSkhLRXBzT1Nhekc2R3FsekhPREMxNVJMRFh0cHM3TVoxaDIydFNLQkdYOGJXUHBEN1BZcGZyWXVSbFRnRVhhRzFqckRSYVc5aGpqMkRSMGU4ZVkvWjd2a1VsMWpMM0NKbWFlRVlPWnVGdTJGcGk3OFR1MFVIdURmSHNEWm42NE5INTdDdVNucmFURnY4MTBUMDQvaGQ0VHZBQkEzQldxU1lNdDl1YVZ6K0RnNEw0QXJyVG9tajEwc2plV1g3eG16QzdET2VtOCtPWnRPaEtmZ0lqbWVYYmFySkZzUGwyTHVZa0VONHpMUDcrMzdMUllNT01LeEZaOEs1OUkzV2xaN2ltaml4aUxGUFFqSytQei9oYzZOSHA5b2l4RG5WczFvSWdmM0xSYWlpUkozbTlNclczN3dPKzBSUzd5T2FuemJIVlBZcFZ5Zm1abXpDcE9rNlcreUpkUFpYei9FQkdkS25YMlV4cGFLcWNJeU9RUGdHeW9QUm1STWl3ejV5a21PZ1ZYTXc4TEFkbFVrNWdDQUdSamJWdEFDakZNUkk4SzZXVUZMQ3pVdGJSZUltRDJGUG9CWEF2Z0NRRGJQVklJS2NzeU9ZTUw0Q1JkdS9lU1FuRVZTa2dHWUpMMEVNeDhKd0J4a1dLamx4RHZFOHZOV3IwNEVadWtoSStMVzhIV1J1emlaY2hSclZZbml5TmFJcnFFaUc1aDVnY0FMQVlnZ1RuV0FGZ1A0RFdqTUtJMGNpMi95VDE1UnA1ZElPOUtHc2FwN1NSbVBrUnQ3NE9saHhaY0VWQUVGQUZGUUJGUUJCUUJSVUFSVUFRVUFVVkFFVkFFRkFGRlFCRlFCQlFCUlVBUlVBUVVBVVZBRVZBRUZBRkZRQkZRQkJRQlJVQVJVQVFVQVVWQUVWQUVGQUZGUUJGUUJCUUJSVUFSVUFSeVF1Qi9mUDBvTTFzR2Q3Y0FBQUFBU1VWT1JLNUNZSUk9Ii8+CjwvZGVmcz4KPC9zdmc+Cg==',
    };
    this.firstNameInput = this.element.querySelector('#first-name') as HTMLInputElement;
    this.lastNameInput = this.element.querySelector('#last-name') as HTMLInputElement;
    this.emailInput = this.element.querySelector('#email') as HTMLInputElement;
    this.avatar = this.element.querySelector('#avatar') as HTMLImageElement;
    this.form = this.element.querySelector('form') as HTMLFormElement;
    this.submitButton = this.element.querySelector('.registration__btn--add-user') as HTMLElement;
    this.cancelButton = this.element.querySelector('.registration__btn--cancel') as HTMLElement;
    this.isFirstNameValid = false;
    this.isLastNameValid = false;
    this.isEmailValid = false;

    this.setAttr();
    this.subscribeEvents();
  }

  setAttr(): void {
    const validityIcons = this.element.querySelectorAll('.registration__checkbox img') as NodeListOf<HTMLImageElement>;
    validityIcons.forEach((validityIcon) => {
      validityIcon.setAttribute('src', imageValidityIcon);
    });

    const avatar = this.element.querySelector('.registration__avatar-label img') as HTMLImageElement;
    avatar.setAttribute('src', imageAvatarTemplate);
  }

  subscribeEvents(): void {
    this.addValidationListener();
    this.cancelButtonListener();
    this.getDataOnFormSubmitListener();
    this.addCloseModalListener();
    this.uploadAvatarListener();
  }

  openModal(): void {
    this.element.classList.add('opened');
    document.body.classList.add('notScrollable');
    this.firstNameInput.focus();
  }

  uploadAvatarListener(): void {
    const inputTypeFile = this.element.querySelector('.registration__avatar-input') as HTMLInputElement;
    inputTypeFile.addEventListener('change', () => {
      this.uploadAvatar(inputTypeFile);
    });
  }

  uploadAvatar(input: HTMLInputElement): void {
    if (!input.files) return;

    const file = input.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.addEventListener('load', () => {
      this.srcAvatarBase64 = reader.result as string;
      this.avatar.setAttribute('src', reader.result as string);
    });
  }

  addCloseModalListener(): void {
    this.element.addEventListener('click', (event) => {
      if (event.target === (this.element as HTMLElement) || event.target === this.cancelButton) {
        this.closeModal();
      }
    });
  }

  closeModal(): void {
    this.element.classList.remove('opened');
    document.body.classList.remove('notScrollable');
  }

  addValidationListener(): void {
    this.validateFirstName(this.firstNameInput);
    this.validateLastName(this.lastNameInput);
    this.validateEmail(this.emailInput);
  }

  validateFirstName(input: HTMLInputElement): void {
    const regexFirstNameHasSymbols = /[[\\^$.|?*+()~@#%_=:;"'`<>,/\]]/;
    const regexFirstNameNotJustNumbers = /[^0-9]/;
    input.addEventListener('input', () => {
      if (!regexFirstNameHasSymbols.test(input.value) && regexFirstNameNotJustNumbers.test(input.value)) {
        this.isFirstNameValid = true;
        this.showValidityIcon(input);
      } else {
        this.isFirstNameValid = false;
        this.hideValidityIcon(input);
      }

      this.checkSubmitButtonState();
    });
  }

  validateLastName(input: HTMLInputElement): void {
    const regexFirstNameHasSymbols = /[[\\^$.|?*+()~@#%_=:;"'`<>,/\]]/;
    const regexFirstNameNotJustNumbers = /[^0-9]/;
    input.addEventListener('input', () => {
      if (!regexFirstNameHasSymbols.test(input.value) && regexFirstNameNotJustNumbers.test(input.value)) {
        this.isLastNameValid = true;
        this.showValidityIcon(input);
      } else {
        this.isLastNameValid = false;
        this.hideValidityIcon(input);
      }

      this.checkSubmitButtonState();
    });
  }

  validateEmail(input: HTMLInputElement): void {
    // prettier-ignore
    const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    input.addEventListener('input', () => {
      if (regexEmail.test(input.value)) {
        this.isEmailValid = true;
        this.showValidityIcon(input);
      } else {
        this.isEmailValid = false;
        this.hideValidityIcon(input);
      }

      this.checkSubmitButtonState();
    });
  }

  showValidityIcon(input: HTMLInputElement): void {
    const formInput = input.closest('.registration__form-input') as HTMLElement;
    this.validityIcon = formInput.querySelector('.registration__checkbox-wrapper') as HTMLElement;
    this.validityIcon.classList.add('valid');
  }

  hideValidityIcon(input: HTMLInputElement): void {
    const formInput = input.closest('.registration__form-input') as HTMLElement;
    this.validityIcon = formInput.querySelector('.registration__checkbox-wrapper') as HTMLElement;
    this.validityIcon.classList.remove('valid');
  }

  checkSubmitButtonState(): void {
    if (this.isFirstNameValid && this.isLastNameValid && this.isEmailValid) {
      this.submitButton.classList.remove('disabled');
    } else {
      this.submitButton.classList.add('disabled');
    }
  }

  cancelButtonListener(): void {
    this.cancelButton.addEventListener('click', () => {
      this.clearForm();
    });
  }

  getDataOnFormSubmitListener(): void {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (this.isFirstNameValid && this.isLastNameValid && this.isEmailValid) {
        this.data.firstName = this.firstNameInput.value;
        this.data.lastName = this.lastNameInput.value;
        this.data.email = this.emailInput.value;
        if (this.srcAvatarBase64) this.data.avatar = this.srcAvatarBase64;
        this.clearForm();
        this.closeModal();
        this.savePlayerDataToDB();
      }
    });
  }

  savePlayerDataToDB(): void {
    const openRequest = indexedDB.open('ileudo', 1);
    let db: IDBDatabase;
    const playerInfo = this.data;
    function addDataToDB() {
      const transaction = db.transaction('Players', 'readwrite');
      const games = transaction.objectStore('Players');
      games.add(playerInfo);
    }

    openRequest.addEventListener('success', () => {
      db = openRequest.result;
      addDataToDB();
    });

    openRequest.addEventListener('error', () => {
      throw new Error('Request to database failed');
    });

    openRequest.addEventListener('upgradeneeded', () => {
      db = openRequest.result;
      if (!db.objectStoreNames.contains('Players')) db.createObjectStore('Players', { autoIncrement: true });
      if (!db.objectStoreNames.contains('Score')) db.createObjectStore('Score', { autoIncrement: true });
    });
  }

  clearForm(): void {
    this.form.reset();
    const formInputsText = this.element.querySelector('.registration__form-inputs');
    formInputsText?.querySelectorAll('input').forEach((i) => this.hideValidityIcon(i));
    if (!this.submitButton.classList.contains('disabled')) this.submitButton.classList.add('disabled');
  }
}

export const registration = new Registration({
  tag: 'section',
  classes: ['registration'],
  id: 'registration',
});
